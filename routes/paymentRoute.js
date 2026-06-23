import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { getOrderById } from "../controllers/paymentController.js";

const router = express.Router();

// Get order by ID (for success/failure page)
router.get("/order/:orderId", isAuthenticated, getOrderById);

export default router;
