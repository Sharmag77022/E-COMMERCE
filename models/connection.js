const mongoose = require('mongoose');
 module.exports = ()=>{
    mongoose.connect('mongodb+srv://sanjeev77022:sanjeev5@cluster0.kz8yo.mongodb.net/ecommerce?retryWrites=true&w=majority', {useNewUrlParser: true,useUnifiedTopology: true});
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
    console.log('connection to Database is Successful')
    });
 }
 //mongodb://localhost:27017/ecommerce