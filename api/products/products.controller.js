const product = require('./products.module');
const mongoose = require('mongoose');

module.exports = {
    save: async(req,res,next)=>{
        try{
            delete req.body._id;
           let newproduct = new product(req.body);
           let result = await newproduct.save();
           if(result)
            res.status(200).send({result: true, data: result,message:"You have add product successfully."});
        }catch(e){
            console.log(e);
        }
    },
    get: async(req,res,next)=>{
        try{
            let pageNumber = req.body.initial;
            let pageSize = 10;

            let filter ={}
            if(req.body.isActive)
               filter["isActive"] = true

            let result = await product.find(filter)
                        .populate('category', ['name'])
                        .sort({createAt:-1})
                        .skip((pageNumber -1)* pageSize)
                        .limit(pageSize)
            res.status(200).send({result: true, data: result});
        }catch(e){
            console.log(e);
        }
    },
    changeStatus: async(req,res,next)=>{
        try{
            let filter = {
                _id: req.body._id
              }
            let result = await product.updateOne(filter, {isActive: req.body.isActive});
            if (result)
               res.status(200).send({ result: true, message: 'You have changed product status' });
        }catch(e){

        }
    },
    deleteProduct: async(req,res,next)=>{
        try{
         let result = await product.findByIdAndDelete(mongoose.Types.ObjectId(req.query.id));
         if(result)
           res.status(200).send({result: true,message:"You have deleted the product successfully."});
        }catch(e){
            next(e);
        }
    },
    updateProduct: async(req,res,next)=>{
        try{
         let find = {
             _id:mongoose.Types.ObjectId(req.query.id) 
         }
         delete req.body._id;
         let result = await product.findByIdAndUpdate(find,req.body);
         if(result)
         res.status(200).send({result: true,message:"You have updated your product successfully!"})
        }catch(e){
           // next(e);
        }
    }
}