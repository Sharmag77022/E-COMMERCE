const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connection = require('./models/connection');
const passport = require('passport')
connection();
const user = require('./routing/user');
let ejs = require('ejs');

const flash = require('express-flash');
const session = require('express-session');

const initializePassport = require('./config/passport-config'); 
app.use(flash());
app.use(session({
   secret:'secret',
   resave:false,
   saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session);


app.set('view engine', 'ejs');
app.use((req,res,next)=>{
    console.log(req.url);
    next();
})
app.use(express.static('public'));


app.use('/user',user);
app.get('/',(req,res)=>
{
    ejs.renderFile('./views/dashboard.ejs', {}, {}, function(err, template){
        res.send(template);
    });
});
app.post('/login',passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/user/login',
    failureFlash: true
}))

app.listen(3000,()=>console.log('server is running at 3000'));