const express = require('express');
const cookieAuth = (req,res,next)=>{
    const token = req.cookies.accessToken;
    req.token = token;
    next();  
}
module.exports = cookieAuth;