const express=require("express");
const Order=require("../models/Order.js");
const Item=require("../models/Item.js");

const router = express.Router();

router.post("/", async(req, res) => {
    const {customerName, items}=req.body;
    if (!customerName || !items.length) {
        return res.status(400).send({message:"Please enter both customer name and items"});
    }

    let totalPrice=0;
    const orderItems=[];

    for (let i of items) {
        const item=await Item.findById(i.itemId);
        if (!item) return res.status(404).send({message:"Item not found"});
        if (item.stock_quantity<i.quantity) {
            return res.status(400).send({message:"Not enough quantity for the items entered"});
        }

        orderItems.push({
            item: item._id,
            quantity: i.quantity,
            price: item.price
        });
        totalPrice+=item.price*i.quantity;
    }

    for(let i of items) {
        const item=await Item.findById(i.itemId);
        item.stock_quantity-=i.quantity;
        await item.save();
    }

    const order=new Order({ 
        customerName: customerName, 
        items: orderItems, 
        totalPrice: totalPrice
    });

    await order.save().then((ord) => {
        res.status(201).send(ord);
    }).catch((err) => {
        res.status(400).send(err);
    });
});

module.exports=router;
