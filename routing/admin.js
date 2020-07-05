require('dotenv').config();
const express = require('express');
const router = express.Router();
const ejs = require('ejs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const adminModel = require('../models/adminSchema');
const merchantReq = require('../models/merchantReq');
const acceptM = require('../models/acceptMerchant');
const rejectM = require('../models/rejectMerchant');
const category = require('../models/categorySchema');
const authTokenA = require('../Authorization/adminAuth');
const bodyParser = require('body-parser');
const authenticateAdmin = require('../Authenticate/adminAuthenticate');
router.get('/login',(req,res)=>{
    ejs.renderFile('./views/loginA.ejs', {}, {}, function(err, template){
        res.send(template);
    });
});
router.post('/loginA',authenticateAdmin,(req,res)=>{
    const accessToken = jwt.sign( (req.admin).toString(),process.env.ACCESS_TOKEN_ADMIN);
    res.cookie('accessToken',accessToken);
    res.redirect('/admin');  
});
router.get('/logoutA',(req,res)=>{
    res.clearCookie('accessToken');
    res.redirect('/admin/login');
})
router.get('/merchantRequests',authTokenA,(req,res)=>{
    //console.log('Hello Sanjeev');
merchantReq.find().then(data=>{
    res.json(data);
})
})

router.post('/acceptM',authTokenA,acceptM,(req,res)=>{
    res.status(200).send();
})
router.post('/rejectM',authTokenA,rejectM,(req,res)=>{
res.status(200).send();
})
router.get('/merchantreq',authTokenA,(req,res)=>
{   
    ejs.renderFile('./views/merchantRequests.ejs', {}, {}, function(err, template){      
        return res.status(301).send(template);
    });  
});
router.get('/categories',authTokenA,(req,res)=>{
    ejs.renderFile('./views/categories.ejs', {}, {}, function(err, template){      
        return res.status(301).send(template);
    }); 
})
router.post('/newcat',authTokenA,(req,res)=>{
    const newCat = new category({name:req.body.category,flag:1});
    newCat.save((err,data)=>{
        if(err){
            console.log(err);
            res.redirect('/admin/categories?NotAdded');
        }
        else{
            console.log('New Category Added');
             res.status(200).send();
        }
    })  
})
router.get('/allcats',authTokenA,(req,res)=>{
    category.find().then(data=>{
        res.json(data);
    })
})
router.post('/toggleCategory',authTokenA,(req,res)=>{
    category.findByIdAndUpdate(req.body.catId, {flag:req.body.flag}, {useFindAndModify:false}).then(data=>{
      res.send();  
    }).catch(err=>console.log(err));
    
})
module.exports = router;