const mongoose = require('mongoose');
const catSchema = new mongoose.Schema({
    name:{type:String,required:true},
    flag:{type:Number,required:true}
});

const categories = mongoose.model('categories',catSchema);
module.exports = categories;