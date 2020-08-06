const express = require('express');
const merchantModel = require('../models/merchantSchema');
const bcrypt = require('bcryptjs');
const authenticateM =  (req,res,next)=>{
    merchantModel.findOne({'email':req.body.email}).then(async (merchant)=>{
        if(merchant===null){
            res.redirect('/merchant/login?merchantNotFound')
        }
        try{
            if( await bcrypt.compare(req.body.password,merchant.password)){
                req.merchant= merchant.toObject();
                next();
            } else {
                res.redirect('/merchant/login?passwordIncorrect')
            }
        }
        catch(e){
            console.log(e);
        }
    })
}
module.exports = authenticateM;