require('dotenv').config();
const express = require('express');
const router = express.Router();
const ejs = require('ejs');
const bcrypt = require('bcryptjs');
const merchantModel = require('../models/merchantSchema');
const bodyParser = require('body-parser');
const authenticateM = require('../Authenticate/merchantAuthenticate');
const jwt = require('jsonwebtoken');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.get('/login',(req,res)=>{
    ejs.renderFile('./views/loginM.ejs', {}, {}, function(err, template){
        res.send(template);
    });
});

router.get('/register',(req,res)=>{
    ejs.renderFile('./views/registerM.ejs', {}, {}, function(err, template){
        res.send(template);
    });   
});

router.post('/register',(req,res)=>{
    
    merchantModel.findOne({'email':req.body.email}).then((document)=>{
        if(document)
        {
            res.redirect('/merchant/register?emailAlreadyExist');
        }
        else
        {
           bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(req.body.password,salt,(err,hashPwd)=>
             {
                 const newMerchant = new merchantModel({name:req.body.name,email:req.body.email,password:hashPwd});
                 newMerchant.save((err,merchant)=>{
                if(err)
                  {
                     console.log(err);
                     res.redirect('/merchant/register?failed');
                 }
                 else
                 {
                    console.log('Added Merchant successfully');
                    res.redirect('/merchant/login?registerSuccess');
                 }
              })
           })
        }) 
       }
    })
})
router.post('/loginM',authenticateM,(req,res)=>{
    const accessToken = jwt.sign( (req.merchant).toString(),process.env.ACCESS_TOKEN_MERCHANT);
    res.cookie('accessToken',accessToken);
    res.redirect('/merchant');  
});
router.get('/logoutM',(req,res)=>{
    res.clearCookie('accessToken');
    res.redirect('/merchant/login');
})
module.exports = router;