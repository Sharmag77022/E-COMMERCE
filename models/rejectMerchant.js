const mongoose = require('mongoose');
const merchantReq = require('./merchantReq');
const rejectMerchant = (req,res,next)=>{
merchantReq.findOneAndDelete({email:req.body.email},(err,data)=>{
    if(err){
        console.log(err);
        res.status(400).send();
    }
    next();
})
}
module.exports = rejectMerchant;