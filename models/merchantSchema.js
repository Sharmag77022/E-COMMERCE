const express = require('express');
const mongoose = require('mongoose');
const merchantSchema = new mongoose.Schema({
    name: {type:String,required:true},
    email:{type:String,required:true},
    password: {type:String,required:true}
  });

  const merchant = mongoose.model('merchants', merchantSchema);
  module.exports= merchant