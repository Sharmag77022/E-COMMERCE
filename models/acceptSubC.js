const mongoose = require('mongoose');
const subCatModel = require('./subCatSchema');
const subCatReq = require('./subCatReq');
const acceptSubC= (req,res,next)=>{
    subCatReq.findOne({mId:req.body.mId,name:req.body.name},(err,data)=>{
    if(err){
        console.log(err);
         res.status(400).send();
    }
    else{
        const newCat= new subCatModel({CatId:data.CatId,name:data.name,flag:1});
        newCat.save((err,category)=>{
            if(err){
               res.status(404).send();
            }else{
                console.log('Added Sub Category Sucessfully');
                subCatReq.findOneAndDelete({mId: req.body.mId,name: req.body.name}, (err,dat)=>{
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
module.exports = acceptSubC;