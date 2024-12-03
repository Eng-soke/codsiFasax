const express = require('express');

const router = express.Router();

const xogtaAdmin = require("../Model/adminRegist")




router.post("/admin/create", async (req, res)=>{
    const newUser = xogtaAdmin(req.body)
    const saveUser = await newUser.save()
    if(saveUser){
        res.send("User has been created")
    }
})



router.post("/admin/login", async (req, res)=>{
    if(req.body.ID && req.body.password){

        const user = await xogtaAdmin.findOne(req.body).select("-password")
        
        if(user){
            res.send(user)
        }
        else{
            res.send({
                error : "incrrect Id or password"
            })
        }

    }

    else{
        res.send({
            error : "incorrect Id or password"
        })
    }
})


router.delete("/admin/delete/:id", async (req, res)=>{
    const userDelete = await xogtaAdmin.deleteOne({_id: req.params.id})
    if(userDelete){
        res.send("User has been deleted")
    }
})


router.put("/update/admin/:id", async (req, res)=>{
    const dataUpdate = await xogtaAdmin.updateOne(
        {_id: req.params.id},
        {$set: req.body}
    )

    if(dataUpdate){
        res.send("admin has been updated")
    }
})

router.get("/admin/update/:id", async (req, res)=>{
    const getSingleUpdate = await xogtaAdmin.find({_id: req.params.id})
    if(getSingleUpdate){
        res.send(getSingleUpdate)
    }
})

module.exports = router;