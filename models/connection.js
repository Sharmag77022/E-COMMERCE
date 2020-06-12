const mongoose = require('mongoose');
 module.exports = ()=>{
    mongoose.connect('mongodb://localhost:27017/ecommerce', {useNewUrlParser: true,useUnifiedTopology: true});
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
    console.log('connection to Database is Successful')
    });
 }