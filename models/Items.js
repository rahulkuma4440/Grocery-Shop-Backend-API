const mongoose=require("mongoose");

const itemSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true 
    },
    description: String,
    image_url: String,
    price: { 
        type: Number, 
        required: true 
    },
    stock_quantity: { 
        type: Number, 
        required: true 
    }
});

module.exports=mongoose.model("Item", itemSchema);