require('dotenv').config();
const express = require('express');
const router = express.Router();
const ejs = require('ejs');
const bcrypt = require('bcryptjs');
const merchantReq = require('../models/merchantReq');
const merchantModel= require('../models/merchantSchema');
const catReqModel = require('../models/categoryRequests'); 
const authTokenM = require('../Authorization/merchantAuth');
const bodyParser = require('body-parser');
const authenticateM = require('../Authenticate/merchantAuthenticate');
const jwt = require('jsonwebtoken');

router.use(bodyParser.urlencoded({ extended: true }));
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
             const newRequest = new merchantReq({name:req.body.name,email:req.body.email,password:hashPwd});
            
                  newRequest.save((err,merchant)=>{
                if(err)
                  {
                     console.log(err);
                     res.redirect('/merchant/register?failed');
                 }
                 else
                 {
                    console.log('Added Merchant Request Successfully');
                    res.redirect('/merchant/login?inProcessing');
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
router.post('/categoryR',authTokenM,(req,res)=>{
    var new1 = req.merchant.split(",");
    id=new1[0].slice(7);
    const catRequest = new catReqModel({MerchantId:id,name:req.body.category});
            
     catRequest.save((err,category)=>{
         if(err)
              {
                  console.log(err);
                  res.redirect('/merchant?CategoryReqfailed');
             }
             else
                {
                    console.log('Category Req sent to Admin');
                    res.redirect('/merchant?ReqinProcessing');
                }
    })
    // console.log(typeof(req.merchant));
    //var mrcnt = JSON.parse(req.merchant);
    //console.log(mrcnt);
})
module.exports = router;