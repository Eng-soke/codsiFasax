const express = require('express');

const router = express.Router();


const xogtaCodsiga = require("../Model/codsiForm")

const userRegist = require("../Model/userRegister")



//codsi

router.post("/codsi", async (req, res)=>{
    const codsiUser = userRegist(req.body)
    const saveUserCodsi = await codsiUser.save()
    if(saveUserCodsi){
        res.send("Request has been sent successfully")
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


router.get("/request", async (req, res) => {
    const stats = await xogtaCodsiga.aggregate([
        { $group: { _id: "$ID", count: { $sum: 1 } } },
        { $sort: { count: -1 } } // Kala saar qofka ugu codsiga badan iyo kan ugu yar
    ]);

    if (stats.length > 0) {
        const topRequester = stats[0]; // Ugu codsiga badan
        const leastRequester = stats[stats.length - 1]; // Ugu codsiga yar
        res.send({ topRequester, leastRequester });
    } else {
        res.send({ message: "No data found" });
    }
});


router.get("/allrequests", async (req, res) => {
    const dhamaanCodsiyada = await xogtaCodsiga.find()
    if(dhamaanCodsiyada){
        res.send(dhamaanCodsiyada)
    }
})




module.exports = router;