require('dotenv').config();
const express = require('express');
const router = express.Router();
const ejs = require('ejs');
const bcrypt = require('bcryptjs');
const merchantReq = require('../models/merchantReq');
const merchantModel= require('../models/merchantSchema');
const productModel = require('../models/productSchema');
const catReqModel = require('../models/categoryRequests'); 
const authTokenM = require('../Authorization/merchantAuth');
const bodyParser = require('body-parser');
const authenticateM = require('../Authenticate/merchantAuthenticate');
const jwt = require('jsonwebtoken');
const category = require('../models/categorySchema');
const subCategoryR= require('../models/subCatReq');
const subCategory =require('../models/subCatSchema');
const randomstring = require("randomstring");
//image uploading
const fs = require('fs'); 
const path = require('path'); 
const multer = require('multer'); 
//__dirname+'/uploads/'
const storage = multer.diskStorage({ 
	destination:function (req, file, cb) {
        cb(null,__dirname + '/../uploads/productImages/' )
      }, 
	filename: (req, file, cb) => { 
		cb(null, file.fieldname + '-' + Date.now()+randomstring.generate(7) + path.extname(file.originalname))
	} 
}); 
//init upload
var upload = multer({
     storage: storage,
     limits: {fileSize:2000000},
     fileFilter: function(req,file,cb){
         checkFileType(file,cb);
     }
}).any(); 

function checkFileType(file,cb){
    const filetypes=/jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if(mimetype && extname){
        return cb(null,true);
    }else{
        cb('Failed:file_invalid')
    }
}
/////////////////////////////////////////////////////////
router.post('/addProduct',authTokenM,(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
        console.log(err);
        res.redirect('/merchant/addProduct?'+err);
    }
        else{
            var id=req.merchant._id;
            console.log(req.body);
            const newProduct= new productModel({name: req.body.productName, 
                desc: req.body.discription, 
                sellerId:id,
                price:req.body.price,
                cat: req.body.sCat,
                images: req.files});
                newProduct.save((err,data)=>{
                    if(err){
                        console.log(err);
                        res.redirect('/merchant/addProduct?NotAdded');
                    }
                    else{
                        res.redirect('/merchant/addProduct?AddedSuccessfully');
                    }
                })
        }
    })
})
////////////////////////////////////////////////////
router.get('/addProduct',(req,res)=>{
    ejs.renderFile('./views/merchant/AddProduct.ejs', {}, {}, function(err, template){
        res.send(template);
    });   
});
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.get('/login',(req,res)=>{
    ejs.renderFile('./views/loginM.ejs', {}, {}, function(err, template){
        res.send(template);
    });
});

router.post('/catRequest',authTokenM,(req,res)=>{
    category.findById(req.body.PId).then((data)=>{
            var id=req.merchant._id;
            const newSubCat = new subCategoryR({CatId:req.body.PId,name:req.body.name,pName:data.name,mId:id});
        newSubCat.save((err,data)=>{
            if(err){
                console.log(err);
                res.redirect('/merchant/category?NotAdded');
            }
            else{
                console.log('New Sub Category Request Added');
                res.status(200).json(data);
            }
        })
    }).catch((err)=>{
        console.log(err);
    })
    
})
router.get('/allcats',authTokenM,(req,res)=>{
    category.find().then(data=>{
        res.json(data);
    })
})

router.post('/allSubCats',authTokenM,(req,res)=>{
    
    subCategory.find({CatId:req.body.PId}).then(data=>{
        res.json(data);
    })
})

router.get('/register',(req,res)=>{
    ejs.renderFile('./views/registerM.ejs', {}, {}, function(err, template){
        res.send(template);
    });   
});



router.post('/register',(req,res)=>{
    
    merchantModel.findOne({'email':req.body.email}).then((document)=>{
        if(document)
        {
            res.redirect('/merchant/register?emailAlreadyExist');
        }
        else
        {
           bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(req.body.password,salt,(err,hashPwd)=>
             {
             const newRequest = new merchantReq({name:req.body.name,email:req.body.email,password:hashPwd});
            
                  newRequest.save((err,merchant)=>{
                if(err)
                  {
                     console.log(err);
                     res.redirect('/merchant/register?failed');
                 }
                 else
                 {
                    console.log('Added Merchant Request Successfully');
                    res.redirect('/merchant/login?inProcessing');
                 }
              })
           })
        }) 
       }
    })
})
router.post('/loginM',authenticateM,(req,res)=>{
    const accessToken = jwt.sign( req.merchant,process.env.ACCESS_TOKEN_MERCHANT);
    res.cookie('accessToken',accessToken);
    res.redirect('/merchant');  
});

router.get('/category',authTokenM,(req,res)=>{
    ejs.renderFile('./views/merchant/category.ejs', {}, {}, function(err, template){
        res.send(template);
    });
})

router.get('/logoutM',(req,res)=>{
    res.clearCookie('accessToken');
    res.redirect('/merchant/login');
})
router.post('/categoryR',authTokenM,(req,res)=>{
    var id=req.merchant._id;
    const catRequest = new catReqModel({MerchantId:id,name:req.body.category});
            
     catRequest.save((err,category)=>{
         if(err)
              {
                  console.log(err);
                  res.redirect('/merchant?CategoryReqfailed');
             }
             else
                {
                    console.log('Category Req sent to Admin');
                    res.redirect('/merchant?ReqinProcessing');
                }
    })
})
router.get('/products',authTokenM,(req,res)=>{
    var id=req.merchant._id;
    productModel.find({sellerId:id}).then(data=>{
          // console.log(data);
            ejs.renderFile('./views/merchant/products.ejs', {data}, {}, function(err, template){
            res.send(template);
        })
        });
    })
   //
   router.get('/moreProducts',authTokenM,async(req,res)=>{
      var skip= parseInt(req.query.skip); 
      var id=req.merchant._id; 
    const count = await productModel.countDocuments({sellerId:id}).then(count=>{
            
            return count;
         })
         console.log(count);
        if(skip>=count){
            skip= skip%count;
            if(skip<5){
                    skip=0;
            }
        }
        productModel.find({sellerId:id}, null, { limit: 5,skip:skip}).then(data=>{
            res.json(data);
         });
       // console.log(skip);
    }) 

module.exports = router;