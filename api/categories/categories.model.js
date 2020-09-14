const mongoose = require('mongoose');

const category = mongoose.Schema({
   name: String,
   quantity: Number,
   description: String,
   isActive: {
       type:Boolean,
       default: true
    },
   createAt: {
       type: Date,
       default: Date.now
   }
});

module.exports = mongoose.model('categories',category);