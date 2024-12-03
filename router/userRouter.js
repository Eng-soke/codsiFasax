const express = require('express');

const router = express.Router();

const xogtaUser = require("../Model/userRegister")




router.post("/user/create", async (req, res)=>{
    const newUser = xogtaUser(req.body)
    const saveUser = await newUser.save()
    if(saveUser){
        res.send("User has been created")
    }
})



router.post("/user/login", async (req, res)=>{
    if(req.body.ID && req.body.password){

        const user = await xogtaUser.findOne(req.body).select("-password")
        
        if(user){
            res.send(user)
        }
        else{
            res.send({
                error : "incrrect email or password"
            })
        }

    }

    else{
        res.send({
            error : "incorrect email or password"
        })
    }
})


router.delete("/admin/user/delete/:id", async (req, res)=>{
    const adminDelete = await xogtaUser.deleteOne({_id: req.params.id})
    if(adminDelete){
        res.send("User has been deleted")
    }
})

router.put("/admin/update/:id", async (req, res)=>{
    const dataUpdate = await xogtaUser.updateOne(
        {_id: req.params.id},
        {$set: req.body}
    )

    if(dataUpdate){
        res.send("User has been updated")
    }
})

router.get("/single/update/admin/:id", async (req, res)=>{
    const getSingleUpdate = await xogtaUser.find({_id: req.params.id})
    if(getSingleUpdate){
        res.send(getSingleUpdate)
    }
})



router.get("/display/user", async (req, res)=>{
    const display = await xogtaUser.find()
    if(display){
        res.send(display)
    }
})




module.exports = router;