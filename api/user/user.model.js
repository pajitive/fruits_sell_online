const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    fullname: String,
    email: {
        type:String,
        unique:true,
        trim:true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,'Please fill a valid email address'],
    },
    phone: {
        type: String,
        required: true
    },
    address: String
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id},'jiobasketSecretKey');
    return token;
}

module.exports = mongoose.model('user',userSchema);