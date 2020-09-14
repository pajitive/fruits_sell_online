const mongoose = require('mongoose');

const product = mongoose.Schema({
    category: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'categories'
    },
    productName: String,
    productPrice: Number,
    quantity: Number,
    unit: String,
    description: String,
    productImg: String,
    isActive: {
        type:Boolean,
        default: true
     },
});
module.exports = mongoose.model('product',product);