require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connection = require('./models/connection');
const jwt = require('jsonwebtoken');
const userModel = require('./models/userSchema');
const user = require('./routing/user');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs')
let ejs = require('ejs');


connection();


app.set('view engine', 'ejs');
//app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));
app.use(express.json());
//function for user authentication
const authenticateUser =  (req,res,next)=>{
    console.log(req.body);
    userModel.findOne({'email':req.body.email}).then(async (user)=>{
        if(user===null){
            res.redirect('/user/login?userNotFound')
        }
        try{
            if( await bcrypt.compare(req.body.password,user.password)){
                //res.redirect('/?success')
                req.user= user;
                next();
            } else {
                res.redirect('/user/login?passwordIncorrect')
            }
        }
        catch(e){
            console.log(e);
        }
    })
}

app.use('/user',user);
app.get('/',(req,res)=>
{
    ejs.renderFile('./views/dashboard.ejs', {}, {}, function(err, template){
       
        return res.status(301).send(template);
    });
});

app.post('/login',authenticateUser,(req,res)=>{
    console.log(req.user);
    const accessToken = jwt.sign( (req.user).toString(),process.env.ACCESS_TOKEN_SECRET);
   // console.log(accessToken);
    //res.json({accessToken:accessToken});
    res.redirect('/');
    
});

app.listen(3000,()=>console.log('server is running at 3000'));