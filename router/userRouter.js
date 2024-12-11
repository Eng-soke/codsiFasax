const express = require('express');

const router = express.Router();

const xogtaUser = require("../Model/userRegister")
const xogtaCodsiga = require("../Model/codsiForm")



router.post("/user/create", async (req, res) => {
    try {
      const newUser = new xogtaUser({
        ID: req.body.ID,
        name: req.body.name,
        password: req.body.password,
        title: req.body.title,
        number: req.body.number,
      });
  
      // Kaydinta user cusub
      const savedUser = await newUser.save();
  
      // Xogta user cusub oo la soo celinayo
      res.send({
        message: "User has been created",
        user: {
          ID: savedUser.ID,
          name: savedUser.name,
          title: savedUser.title,
          number: savedUser.number,
        },
      });
    } catch (error) {
      console.error("Error creating user:", error);
      res.send({ error: "Failed to create user" });
    }
  });
  



router.post("/user/login", async (req, res) => {
    if (req.body.ID && req.body.password) {
        const user = await xogtaUser.findOne({ 
            ID: req.body.ID, 
            password: req.body.password 
        }).select("-password"); // Password ha soo bandhigin

        if (user) {
            // Haddii user jiro, soo hel dhamaan codsiyada uu leeyahay
            const userRequests = await xogtaCodsiga.find({ ID: user.ID });

            res.send({
                user: {
                    ID: user.ID,
                    name: user.name,    
                    title: user.title,  
                    number: user.number
                },
                requests: userRequests,
            });
        } else {
            res.send({
                error: "Incorrect ID or password",
            });
        }
    } else {
        res.send({
            error: "ID and password are required",
        });
    }
});



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