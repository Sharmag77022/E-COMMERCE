const mongoose = require('mongoose');
const subCatReq = new mongoose.Schema({
    CatId:{type:String,required:true},
    name:{type:String,required:true},
    pName:{type:String,required:true},
    mId: {type:String,required:true}
});

const subCategoryR = mongoose.model('subCatRequests',subCatReq);
module.exports = subCategoryR;