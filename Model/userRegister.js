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
    title:{
        type:String,
        required:true,
    },
    number:{
        type: Number,
        required:true,
    },
    password:{
        type:String,
        required:true
    }
 
})
module.exports  = mongoose.model("user", userRegist);

 