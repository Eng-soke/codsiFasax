const mongoose = require('mongoose');

const adminRegist = mongoose.Schema({
    ID:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})
module.exports  = mongoose.model("admin", adminRegist);