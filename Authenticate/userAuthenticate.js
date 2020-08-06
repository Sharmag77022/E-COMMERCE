const express = require('express');
const userModel = require('../models/userSchema');
const bcrypt = require('bcryptjs');

const authenticateUser =  (req,res,next)=>{
    userModel.findOne({'email':req.body.email}).then(async (user)=>{
        if(user===null){
            res.redirect('/user/login?userNotFound')
        }
        try{
            if( await bcrypt.compare(req.body.password,user.password)){
                req.user= user.toObject();
                next();
            } else {
                res.redirect('/user/login?passwordIncorrect')
            }
        }
        catch(e){
            console.log(e);
        }
    })
}
module.exports = authenticateUser;