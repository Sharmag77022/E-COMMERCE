const express = require('express');
const router = express.Router();
const ejs = require('ejs');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const userModel = require('../models/userSchema');
const bodyParser = require('body-parser');

//const passport = require('passport');




router.use(express.static('public'));
router.get('/login',(req,res)=>{
    ejs.renderFile('./views/login.ejs', {}, {}, function(err, template){
        res.send(template);
    });
});
router.get('/register',(req,res)=>{
    ejs.renderFile('./views/register.ejs', {}, {}, function(err, template){
        res.send(template);
    });   
});

router.post('/register',(req,res)=>{
    userModel.findOne({'email':req.body.email}).then((document)=>{
        if(document)
        {
            res.redirect('/user/register?emailAlreadyExist');
        }
        else
        {
           bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(req.body.password,salt,(err,hashPwd)=>
             {
                 const newUser = new userModel({name:req.body.name,email:req.body.email,password:hashPwd});
                 newUser.save((err,user)=>{
                if(err)
                  {
                     console.log(err);
                     res.redirect('/user/register?failed');
                 }
                 else
                 {
                    console.log('Added user successfully');
                    res.redirect('/user/login?registerSuccess');
                 }
              })
           })
        }) 
       }
    })
})


module.exports = router;