const express = require('express');
const adminModel = require('../models/adminSchema');
const bcrypt = require('bcryptjs');

const authenticateAdmin =  (req,res,next)=>{
    adminModel.findOne({'email':req.body.email}).then(async (admin)=>{
        if(admin===null){
            res.redirect('/admin/login?AdminNotFound')
        }
        try{
            if( await bcrypt.compare(req.body.password,admin.password)){
                req.admin= admin.toObject();
                next();
            } else {
                res.redirect('/admin/login?passwordIncorrect')
            }
        }
        catch(e){
            console.log(e);
        }
    })
}
module.exports = authenticateAdmin;