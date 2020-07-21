const mongoose = require('mongoose');
const subCatReq = require('./subCatReq');
const rejectCategory = (req,res,next)=>{
subCatReq.findOneAndDelete({CatId: req.body.pCatId,name: req.body.name,mId:req.body.mId},(err,data)=>{
    if(err){
        console.log(err);
        res.status(400).send();
    }
    next();
})
}
module.exports = rejectCategory;