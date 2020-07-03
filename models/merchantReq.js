const express = require('express');
const mongoose = require('mongoose');
const mReq = new mongoose.Schema({
    name: {type:String,required:true},
    email:{type:String,required:true},
    password: {type:String,required:true}
  });

  const merchantReq = mongoose.model('merchantRequest', mReq);
  module.exports= merchantReq