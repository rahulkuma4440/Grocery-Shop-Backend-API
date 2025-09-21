const mongoose=require("mongoose");

const orderSchema=new mongoose.Schema(
    {
        customerName: { 
            type: String, 
            required: true 
        },
        status: { 
            type: String, 
            enum: ["Pending", "Delivered"], 
            default: "Pending" 
        },
        items: [
            {
                item: { 
                    type: mongoose.Schema.Types.ObjectId, 
                    ref: "Item", 
                    required: true 
                },
                quantity: { 
                    type: Number, 
                    required: true 
                },
                price: { 
                    type: Number, 
                    required: true 
                }
            }
        ],
        totalPrice: { 
            type: Number, 
            required: true 
        }
    },
    { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
