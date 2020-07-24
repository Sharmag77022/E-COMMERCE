var mongoose = require('mongoose'); 
  
var ProductSchema = new mongoose.Schema({ 
    name: String, 
    desc: String, 
    price:Number,
    cat: String,
    images: 
    {  
        img1:{
        data: Buffer, 
        contentType: String 
        } ,
        img2:{
            data: Buffer, 
            contentType: String 
        },
        img3:{
            data: Buffer, 
            contentType: String 
        },
        img4:{
            data: Buffer, 
            contentType: String 
        }
    }
}); 
const product = new mongoose.model('Products', ProductSchema); 
module.exports = product