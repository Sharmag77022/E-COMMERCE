const express = require('express');
const localStrategy = require('passport-local').Strategy;
const userModel = require('../models/userSchema');
const bcrypt = require('bcryptjs');
function intializePassport(passport,email,password){
    const authenticateUser =  (email,password,done)=>{
        userModel.findOne({'email':email}).then(async (user)=>{
            if(user===null){
                return done(null,false,{message:'No User Exist with this Email.'})
            }
            try{
                if( await bcrypt.compare(password,user.password)){
                    return done(null,user);
                } else {
                    return done(null,false,{message:'Password is Incorrect.'});
                }
            }
            catch(e){
                return done(e)
            }
        })
    }

    passport.use(new localStrategy({usernameField:'email'},authenticateUser));
    passport.serializeUser((user,done)=>{});
    passport.deserializeUser((id,done)=>{});
}

module.exports = intializePassport;