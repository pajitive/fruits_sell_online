const categories = require('../categories/categories.model');
const mongoose = require('mongoose');

module.exports = {
    save: async(req,res,next)=>{
        try{
            delete req.body._id;
            let category = new categories(req.body);
            let result = await category.save();
            res.status(200).send({result: true, data: result,message:"You have add category successfully."});
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
            let result = await categories.find(filter)
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
            let result = await categories.updateOne(filter, {isActive: req.body.isActive});
            if (result)
               res.status(200).send({ result: true, message: 'You have changed product status' });
        }catch(e){

        }
    },
    deleteCategory: async(req,res,next)=>{
        try{
         let result = await categories.findByIdAndDelete(mongoose.Types.ObjectId(req.query.id));
         if(result)
           res.status(200).send({result: true,message:"You have deleted the category successfully."});
        }catch(e){
            next(e);
        }
    },
    updateCategory: async(req,res,next)=>{
        try{
         let find = {
             _id:mongoose.Types.ObjectId(req.query.id) 
         }
         delete req.body._id;
         let result = await categories.findByIdAndUpdate(find,req.body);
         if(result)
         res.status(200).send({result: true,message:"You have updated your category successfully!"})
        }catch(e){
           // next(e);
        }
    }
}