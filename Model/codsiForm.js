const mongoose = require('mongoose');

const codsiFrom = mongoose.Schema({
    ID:{
        type: String,
        required:true,
    },
    name:{
        type: String,
        
    },
    codsi:{
        type: String,
        required:true,
    },
    workPlace:{
        type: String,
        required:true
    },
    departureTime:{
        type: String,
        required:true
    },
    returnTime:{
        type: String,
        required:true
    },
    location:{
        type: String,
        required:true
    },
},{timestamps: true})

module.exports  = mongoose.model("Vacation", codsiFrom);