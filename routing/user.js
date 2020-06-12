const express = require('express');
const router = express.Router();
const ejs = require('ejs');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const userModel = require('../models/userSchema');
const bodyParser = require('body-parser');

//const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');

const initializePassport = require('../config/passport-config.js'); 
router.use(flash());
router.use(session({
   secret:'secret',
   resave:false,
   saveUninitialized: false
}))
router.use(passport.initialize());
router.use(passport.session);

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

router.post('/login',passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/user/login',
    failureFlash: true
}))
module.exports = router;