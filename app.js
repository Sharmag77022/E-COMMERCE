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
const cartModel = require('./models/cartSchema');
const authToken = require('./Authorization/userAuth');
const cookieAuth = require('./Authorization/cookieAuth');
const authTokenM = require('./Authorization/merchantAuth');
const authTokenA = require('./Authorization/adminAuth');
const productModel = require('./models/productSchema');
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

app.get('/', authToken,async (req,res)=>
{
   
    const products = await productModel.find({},null,{limit:12}).then(data=>{
        return data;
    })
    category.find().then(data=>{
        subCategory.find().then((sdata)=>{
            var dataC= {categories:{data1:data,data2:sdata},products:products};
            //console.log(dataC.products);
            ejs.renderFile('./views/dashboard.ejs', {dataC}, {}, function(err, template){
                if(err){
                    console.log(err);
                }
                return res.status(301).send(template);
        })
     });  
    })
    
});
//Load More Products on scroll
app.get('/moreProducts',async(req,res)=>{
    var skip= parseInt(req.query.skip);  
  const count = await productModel.countDocuments().then(count=>{
          
          return count;
       })
      // console.log(count);
      if(skip>=count){
          skip= skip%count;
          if(skip<12){
                  skip=0;
          }
      }
      productModel.find({}, null, { limit: 12,skip:skip}).then(data=>{
          //console.log(data);
          res.json(data);
       });
  }) 
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
app.get('/product',(req,res)=>{
        const pId= req.query.p;
   productModel.find({_id:pId}).then(data=>{
    ejs.renderFile('./views/product.ejs',{data},{},function(err,template){
        if(err){console.log(err)
        };
       return res.status(301).send(template);
    })   
   })
   
})
app.get('/cartQuantity',authToken,async(req,res)=>{
    var new1 = req.user.split(",");
    var id=new1[0].slice(7);
   const cartQ = await cartModel.find({userId:id},'quantity').then(data=>{
       var q=0;
       for(let i=0;i<data.length;i++){
           q=q+data[i].quantity;
       }
       return q;
   }).catch(err=>{
       console.log(err);
   })
   res.json(cartQ);
})
app.listen(3000,()=>console.log('server is running at 3000'));
