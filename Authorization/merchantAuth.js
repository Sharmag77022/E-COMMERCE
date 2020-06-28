require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');

const authTokenM = (req,res,next)=>{
    if(req.token == null)  {
       return res.redirect('/merchant/login');

    }
    jwt.verify(req.token,process.env.ACCESS_TOKEN_MERCHANT,(err,merchant)=>{
        if(err) return res.redirect('/user/merchant');
        req.merchant = merchant;
        next();
       })
}
module.exports = authTokenM;
