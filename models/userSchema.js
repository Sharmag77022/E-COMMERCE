const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true}  
});

const user = mongoose.model('user',userSchema);
module.exports = user;
// address:{
    //     hNo:{type:Number,default: '0'},
    //     city:{type:String,default: 'blank'},
    //     district:{type:String,default: 'blank'},
    //     pincode:{type:Number,default: '000000'},
    //     state:{type:String,default: 'blank'}     
    // }