const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    pId:{type:String,required:true},
    userId:{type:String,required:true},
    status:{type:Number,default:0},
    quantity:{type:Number,default:1},
    price:{type:Number}
},{
    timestamps: true
});
const order = mongoose.model('orders',orderSchema);
module.exports = order;