var mongoose = require('mongoose'); 
  
var ProductSchema = new mongoose.Schema({ 
    name: String, 
    desc: String, 
    price:Number,
    cat: String,
    images: []
    
}); 
const product = new mongoose.model('Products', ProductSchema); 
module.exports = product