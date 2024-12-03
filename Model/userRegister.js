const mongoose = require('mongoose');

const userRegist = mongoose.Schema({
    ID:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true,
    },
    workPlace:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    }
 
})
module.exports  = mongoose.model("user", userRegist);