const mongoose = require('mongoose');
const merchantModel = require('./merchantSchema.js');
const merchantReq = require('./merchantReq.js');
const acceptM = (req,res,next)=>{
merchantReq.findOne({email:req.body.email},(err,data)=>{
    if(err){
        console.log(err);
         res.status(400).send();
    }
    else{
        console.log(data.password);
        const newMerchant = new merchantModel({name:data.name,email:data.email,password:data.password});
        newMerchant.save((err,merchant)=>{
            if(err){
               res.status(404).send();
            }else{
                console.log('Added Merchant Sucessfully');
                merchantReq.findOneAndDelete({email: req.body.email}, (err,dat)=>{
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
module.exports = acceptM;