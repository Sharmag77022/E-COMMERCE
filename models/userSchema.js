const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    address:{
        hNo:{type:Number},
        city:{type:String},
        district:{type:String},
        state:{type:String}
    }
});

const user = mongoose.model('user',userSchema);
module.exports = user;