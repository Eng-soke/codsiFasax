const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());



const userRouter = require("./router/userRouter");
app.use(userRouter)

const adminAdmin = require("./router/adminRouter")
app.use(adminAdmin)

const codsiForm = require("./router/codsiRouter")
app.use(codsiForm)



mongoose.connect("mongodb://localhost:27017/CodsiFasax").then(()=>{
    console.log("Connected to MongoDB");
}).catch((error)=> console.log(error))







app.listen(3000, ()=>{
    console.log("Server listening on port");
    
})