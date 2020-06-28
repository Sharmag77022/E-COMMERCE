require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');

const authToken = (req,res,next)=>{
    if(req.token == null)  {
       return res.redirect('/user/login');

    }
    jwt.verify(req.token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err) return res.redirect('/user/login');
        req.user = user;
        next();
       })
}
module.exports = authToken;
