require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connection = require('./models/connection');
const jwt = require('jsonwebtoken');
const userModel = require('./models/userSchema');
const merchantModel = require('./models/merchantSchema');
const user = require('./routing/user');
const merchant = require('./routing/merchant');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
let ejs = require('ejs');
const authenticateUser = require('./Authenticate/userAuthenticate');
const authToken = require('./Authorization/userAuth');
const cookieAuth = require('./Authorization/cookieAuth');
const authenticateM = require('./Authenticate/merchantAuthenticate');
const authTokenM = require('./Authorization/merchantAuth');
connection();


app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(express.static('public'));

app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
  })
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieAuth);

app.use(express.json());

//function for user authentication

//function for merchant Authentication


//auth merchant Token


 app.use('/user',user);
 app.use('/merchant',merchant);
app.get('/',authToken,(req,res)=>
{
   
    ejs.renderFile('./views/dashboard.ejs', {}, {}, function(err, template){
       
        return res.status(301).send(template);
    });
  
});
app.get('/merchant',authTokenM,(req,res)=>
{
   
    ejs.renderFile('./views/dashboardM.ejs', {}, {}, function(err, template){
       
        return res.status(301).send(template);
    });
  
});
app.get('/logout',(req,res)=>{
    res.clearCookie('accessToken');
    res.redirect('/user/login');
})

app.get('/logoutM',(req,res)=>{
    res.clearCookie('accessToken');
    res.redirect('/merchant/login');
})

app.post('/login',authenticateUser,(req,res)=>{
    const accessToken = jwt.sign( (req.user).toString(),process.env.ACCESS_TOKEN_SECRET);
    res.cookie('accessToken',accessToken);
    res.redirect('/');  
});
//Merchant Login request

app.post('/loginM',authenticateM,(req,res)=>{
    const accessToken = jwt.sign( (req.merchant).toString(),process.env.ACCESS_TOKEN_MERCHANT);
    res.cookie('accessToken',accessToken);
    res.redirect('/merchant');  
});


app.listen(3000,()=>console.log('server is running at 3000'));