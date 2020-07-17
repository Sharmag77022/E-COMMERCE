const mongoose = require('mongoose');
const subCatSchema = new mongoose.Schema({
    CatId:{type:String,required:true},
    name:{type:String,required:true},
    flag:{type:Number,required:true}
});

const subCategories = mongoose.model('subcategories',subCatSchema);
module.exports = subCategories;