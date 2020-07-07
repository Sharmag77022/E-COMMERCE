const mongoose = require('mongoose');
const catSchemaR = new mongoose.Schema({
    AdminId:{type:String},
    name:{type:String,required:true}
});

const categoriesR = mongoose.model('categoriesR',catSchemaR);
module.exports = categoriesR;