const express = require('express');
const app = express();
const connection = require('./models/connection');
const admin = require('./routing/admin');
const user = require('./routing/user');
const merchant = require('./routing/merchant');
const category = require('./models/categorySchema');
const subCategory = require('./models/subCatSchema');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
let ejs = require('ejs');
const authToken = require('./Authorization/userAuth');
const cookieAuth = require('./Authorization/cookieAuth');
const authTokenM = require('./Authorization/merchantAuth');
const authTokenA = require('./Authorization/adminAuth');
connection();
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(express.static('public'));
app.use('/pImg', express.static('uploads/productImages'))
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
  })
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieAuth);

app.use(express.json());


app.use('/user',user);
app.use('/merchant',merchant);
app.use('/admin',admin);

app.get('/',authToken,(req,res)=>
{
    category.find().then(data=>{
        subCategory.find().then((sdata)=>{
            var dataC= {categories:{data1:data,data2:sdata}};
            ejs.renderFile('./views/dashboard.ejs', {dataC}, {}, function(err, template){
                // if(err){
                //     console.log(err);
                // }
                return res.status(301).send(template);
        })
     });  
    })
    
});
app.get('/merchant',authTokenM,(req,res)=>
{   
    ejs.renderFile('./views/merchant/dashboardM.ejs', {}, {}, function(err, template){      
        return res.status(301).send(template);
    });  
});
app.get('/admin',authTokenA,(req,res)=>
{   
    ejs.renderFile('./views/dashboardA.ejs', {}, {}, function(err, template){      
        return res.status(301).send(template);
    });  
});

app.listen(3000,()=>console.log('server is running at 3000'));
