const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connection = require('./models/connection');
const passport = require('passport')
connection();

let ejs = require('ejs');


const user = require('./routing/user')(passport);
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

app.listen(3000,()=>console.log('server is running at 3000'));