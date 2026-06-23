import express from "express";
import { isAuthenticated, isAdmin } from "../middleware/isAuthenticated.js";
import { createOrder, getMyOrders, getAllOrders, updateOrderStatus } from "../controllers/orderController.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.post("/create", isAuthenticated, singleUpload, createOrder);
router.get("/my-orders", isAuthenticated, getMyOrders);
router.get("/all", isAuthenticated, isAdmin, getAllOrders);
router.put("/update-status/:orderId", isAuthenticated, isAdmin, updateOrderStatus);

export default router;
