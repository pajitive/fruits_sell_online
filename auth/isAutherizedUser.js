const signup = require('../api/user/user.model');
const jwt = require('jsonwebtoken');

module.exports = (req,res, next) =>{
    let tokenHolder = req.headers['authorization'].split(' ');
    const token = tokenHolder[1];
    jwt.verify(token, 'jiobasketSecretKey',(err,authData) =>{
        if(err) res.sendStatus(403);
        if(authData != undefined){
            signup.find({ '_id': authData._id}, function(err,doc){
                if(err){
                    console.log(err);
                    res.status(404).send({message:err})
                    return;
                }
                req.user = doc[0];
                next();
            return;
            })
        }
    })
}