require('dotenv').config();
const express = require('express');
const router = express.Router();
const ejs = require('ejs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userModel = require('../models/userSchema');
const bodyParser = require('body-parser');
const authenticateUser = require('../Authenticate/userAuthenticate');
const authToken = require('../Authorization/userAuth');
const cartModel = require('../models/cartSchema');
const productModel = require('../models/productSchema');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

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
router.post('/login',authenticateUser,(req,res)=>{
    const accessToken = jwt.sign( (req.user).toString(),process.env.ACCESS_TOKEN_SECRET);
    res.cookie('accessToken',accessToken);
    res.redirect('/');  
});
router.get('/logout',(req,res)=>{
    res.clearCookie('accessToken');
    res.redirect('/user/login');
})

router.get('/addToCart',authToken,(req,res)=>{
    var new1 = req.user.split(",");
    var userId=new1[0].slice(7);
    const pId = req.query.pId;
    cartModel.find({userId:userId,pId:pId}).then(data=>{
        if(data==""){
         const cart = new cartModel({userId:userId,
        pId:pId,
        quantity:1
        })
        cart.save((err,p)=>{
            if(err){
                res.json({msg:"Failed: There is some error in adding Product to cart!",flag:1});
            }else{
                res.json({msg:"Success: Product is Added to Cart!",flag:0});
            }
        })
        }else{
            if(data[0].quantity==2){
                res.json({msg:"Failed: You Can Only Add Max Quantity Of Two!"})
            }else{
            cartModel.findOneAndUpdate({userId:userId,pId:pId}, { quantity:data[0].quantity+1 }, {new:true,useFindAndModify:false}).then(dat=>{
                res.json({msg:"Success: Product is Added to Cart!",flag:0});
            }).catch(err=>{
                res.json({msg:"Failed: There is some error in adding Product to cart!",flag:1});
            })
        }
        }
    }).catch(err=>{
        console.log(err);
    })

})
router.get('/cart',authToken,async(req,res)=>{
    var new1 = req.user.split(",");
    var userId=new1[0].slice(7);
    var product=[];
    var totalPrice=0;
    const cart = await cartModel.find({userId:userId}).then(data=>{
        return data;
    })
    //console.log(cart);
    for(let i=0;i<cart.length;i++){
        var p =await productModel.find({_id:cart[i].pId},'name _id price images').then(data=>{
            return data;
        })
        totalPrice = totalPrice + cart[i].quantity*p[0].price;
        product.push([{pId:cart[i].pId,price:p[0].price,image:p[0].images[0].filename,quantity:cart[i].quantity,name:p[0].name}]);    
    }
    var data={products:product,price:totalPrice}
    ejs.renderFile('./views/cart.ejs',{data},{},(err,template)=>{
        res.send(template);
    })
})
router.get('/removeCart',authToken,(req,res)=>{
    var new1 = req.user.split(",");
    var userId=new1[0].slice(7);
    cartModel.findOneAndDelete({userId:userId,pId:req.query.pId},{},(err,data)=>{
        if(err){
            console.log(err);
            res.status(500).send();
        }
        if(data){
            res.status(200).json({quantity:data.quantity});
        }else{
            res.status(500).send();
        }
    })
})
router.get('/account',authToken,(req,res)=>{
    var new1 = req.user.split(",");
    var userId=new1[0].slice(7);
    userModel.findById(userId,'name email address').then(data=>{
        ejs.renderFile('./views/account.ejs', {data}, {}, function(err, template){
            res.send(template);
        });
    })
})

router.get('/buy',authToken,(req,res)=>{
    var new1 = req.user.split(",");
    var userId=new1[0].slice(7);
    userModel.find({_id:userId},'name email address').then(data=>{
        ejs.renderFile('./views/delivery.ejs',{data},{},function(err,template){
            if(err){
                console.log(err);
            }
            res.send(template);
        })
    }) 
})


module.exports = router;