require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');

const authTokenA = (req,res,next)=>{
    if(req.token == null)  {
       return res.redirect('/admin/login');

    }
    jwt.verify(req.token,process.env.ACCESS_TOKEN_ADMIN,(err,admin)=>{
        
        if(err) return res.redirect('/admin/login');
        req.admin = admin;
        next();
       })
}
module.exports = authTokenA;
