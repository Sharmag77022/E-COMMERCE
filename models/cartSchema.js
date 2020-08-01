var mongoose = require('mongoose'); 
var cartSchema = new mongoose.Schema({ 
    userId:{type:String,required:true},
    pId:{type:String,required:true},
    quantity:{type:Number,required:true}   
}); 
const cart = new mongoose.model('Carts',cartSchema); 
module.exports = cart;