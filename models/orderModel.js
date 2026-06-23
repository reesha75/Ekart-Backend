import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    items: [
        {
            productId: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: "Product", 
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
    totalAmount: { 
        type: Number, 
        required: true 
    },
    status: { 
        type: String, 
        enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"], 
        default: "Pending" 
    },
    address: { 
        type: String, 
        required: true 
    },
    city: { 
        type: String, 
        required: true 
    },
    zipcode: { 
        type: String, 
        required: true 
    },
    phoneNo: { 
        type: String, 
        required: true 
    },
    paymentMethod: {
        type: String,
        enum: ["COD", "Easypaisa"],
        default: "COD"
    },
    paymentStatus: {
        type: String,
        enum: ["Pending", "Paid", "Failed"],
        default: "Pending"
    },
    transactionId: {
        type: String,
        default: null
    },
    paymentScreenshot: {
        url: { type: String, default: null },
        public_id: { type: String, default: null }
    }
}, { timestamps: true });

export const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
