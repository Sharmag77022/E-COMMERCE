const mongoose = require('mongoose');
const categoryModel = require('./categorySchema.js');
const categoryReq = require('./categoryRequests');
const acceptC= (req,res,next)=>{
categoryReq.findOne({MerchantId:req.body.mId,name:req.body.name},(err,data)=>{
    if(err){
        console.log(err);
         res.status(400).send();
    }
    else{
        const newCat= new categoryModel({name:data.name,flag:1});
        newCat.save((err,category)=>{
            if(err){
               res.status(404).send();
            }else{
                console.log('Added Category Sucessfully');
                categoryReq.findOneAndDelete({MerchantId: req.body.mId,name: req.body.name}, (err,dat)=>{
                    if(err){
                        console.log(err);
                    }else{
                        console.log("deleted Successfully");
                    }
                })
                
            }
        })
    }
    next();
})
}
module.exports = acceptC;