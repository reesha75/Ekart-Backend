import { Order } from "../models/orderModel.js";
import { Cart } from "../models/cartModel.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataUri.js";

// Place a new order (Checkout)
export const createOrder = async (req, res) => {
    try {
        const userId = req.user._id;
        const { address, city, zipcode, phoneNo, paymentMethod, transactionId } = req.body;

        // Find the user's cart
        const cart = await Cart.findOne({ userId });
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Your cart is empty. Add products to check out."
            });
        }

        // Determine delivery details (from body or user profile fallback)
        const finalAddress = address || req.user.address;
        const finalCity = city || req.user.city;
        const finalZipcode = zipcode || req.user.zipcode;
        const finalPhoneNo = phoneNo || req.user.phoneNo;

        if (!finalAddress || !finalCity || !finalZipcode || !finalPhoneNo) {
            return res.status(400).json({
                success: false,
                message: "Please update your shipping address and phone number in your profile before placing an order."
            });
        }

        const method = paymentMethod || "COD";

        // Handle screenshot upload if present
        let screenshotData = null;
        if (req.file) {
            const fileUri = getDataUri(req.file);
            const result = await cloudinary.uploader.upload(fileUri, {
                folder: "order_screenshots"
            });
            screenshotData = {
                url: result.secure_url,
                public_id: result.public_id
            };
        }

        // Create the order
        const newOrder = new Order({
            userId,
            items: cart.items.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
                price: item.price
            })),
            totalAmount: cart.totalPrice,
            address: finalAddress,
            city: finalCity,
            zipcode: finalZipcode,
            phoneNo: finalPhoneNo,
            paymentMethod: method,
            paymentStatus: "Pending",
            transactionId: transactionId || null,
            paymentScreenshot: screenshotData,
            status: "Pending"
        });

        // Save order to database
        await newOrder.save();

        // Clear user's cart
        cart.items = [];
        cart.totalPrice = 0;
        await cart.save();

        res.status(201).json({
            success: true,
            message: "Order placed successfully!",
            order: newOrder
        });

    } catch (error) {
        console.error("Create Order Error:", error);
        res.status(500).json({
            success: false,
            message: "Server error while placing order.",
            error: error.message
        });
    }
};

// Get logged in user's orders
export const getMyOrders = async (req, res) => {
    try {
        const userId = req.user._id;

        // Fetch user orders sorted by newest first and populate product details
        const orders = await Order.find({ userId })
            .populate("items.productId")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            orders
        });

    } catch (error) {
        console.error("Get Orders Error:", error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching orders.",
            error: error.message
        });
    }
};

// Get ALL orders (Admin Only)
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("userId", "firstName lastName email")
            .populate("items.productId", "productName productImg productPrice")
            .sort({ createdAt: -1 });

        const totalRevenue = orders
            .filter(o => o.status !== "Cancelled")
            .reduce((sum, o) => sum + o.totalAmount, 0);

        res.status(200).json({
            success: true,
            orders,
            totalRevenue
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error while fetching all orders.",
            error: error.message
        });
    }
};

// Update Order Status (Admin Only)
export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status, paymentStatus } = req.body;

        const updateData = {};
        if (status) {
            const validStatuses = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];
            if (!validStatuses.includes(status)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid status value"
                });
            }
            updateData.status = status;
        }

        if (paymentStatus) {
            const validPaymentStatuses = ["Pending", "Paid", "Failed"];
            if (!validPaymentStatuses.includes(paymentStatus)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid payment status value"
                });
            }
            updateData.paymentStatus = paymentStatus;
        }

        const order = await Order.findByIdAndUpdate(
            orderId,
            updateData,
            { new: true }
        ).populate("userId", "firstName lastName email");

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).json({
            success: true,
            message: `Order updated successfully`,
            order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error while updating order.",
            error: error.message
        });
    }
};
