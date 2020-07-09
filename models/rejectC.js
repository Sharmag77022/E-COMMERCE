const mongoose = require('mongoose');
const categoryReq = require('./categoryRequests');
const rejectCategory = (req,res,next)=>{
categoryReq.findOneAndDelete({MerchantId: req.body.mId,name: req.body.name},(err,data)=>{
    if(err){
        console.log(err);
        res.status(400).send();
    }
    next();
})
}
module.exports = rejectCategory;