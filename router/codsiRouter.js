const express = require('express');

const router = express.Router();


const xogtaCodsiga = require("../Model/codsiForm")

const userRegist = require("../Model/userRegister")



//codsi

router.post("/codsi", async (req, res)=>{
    const adminUser = await userRegist.findOne({ID: req.body.ID})
    if(!adminUser){
       return res.send({
            error : "Id not found",
        })
    }
    const newCodsi = new xogtaCodsiga(req.body)
    const saveCodsi = await newCodsi.save()

    if(saveCodsi){
        res.send("Codsiga waad ku guuleysatay")
    }
    else{
        res.send({
            error : "Id not found",
        })
    }


})



router.put("/update/user/:id", async (req, res)=>{
    const userUpdate = await xogtaCodsiga.updateOne(
        {_id: req.params.id},
        {$set: req.body}
    )

    if(userUpdate){
        res.send("User has been updated")
    }
})


router.get("/single/update/:id", async (req, res)=>{
    const getSingleUpdate = await xogtaCodsiga.find({_id: req.params.id})
    if(getSingleUpdate){
        res.send(getSingleUpdate)
    }
})


router.delete("/user/delete/:id", async (req, res)=>{
    const userDelete = await xogtaCodsiga.deleteOne({_id: req.params.id})
    if(userDelete){
        res.send("Form has been deleted")
    }
})





module.exports = router;