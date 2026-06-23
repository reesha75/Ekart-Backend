import { Order } from "../models/orderModel.js";

// Get single order for success/failure page
export const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId)
      .populate("items.productId", "productName productImg productPrice");

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    // Only allow owner or admin
    if (order.userId.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    return res.status(200).json({ success: true, order });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
