const express=require("express");

const router = express.Router();

router.get("/", async (req, res) => {
    await Item.find().then((items) => {
        res.status(200).send(items);
    }).catch((err) => {
        res.status(500).send(err);
    }) 
});

module.exports=router;
