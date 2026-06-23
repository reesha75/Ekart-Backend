import express from "express";
import { registerUser, verify , reverifyEmail, loginUser,logoutUser,forgotPassword,verifyOtp,ChangePassword,getAllUsers, getUserById, updateUser} from "../controllers/userControllers.js";
import { isAdmin, isAuthenticated } from "../middleware/isAuthenticated.js";
import {singleUpload} from "../middleware/multer.js"
const router = express.Router();

router.post("/register", registerUser);
router.post("/verify", verify);
router.post("/reverify", reverifyEmail);
router.post("/login", loginUser);
router.post("/logout", isAuthenticated, logoutUser);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp/:email", verifyOtp);
router.post("/change-password/:email", ChangePassword);
router.get("/all-users", isAuthenticated, isAdmin, getAllUsers);
router.get("/get-user/:userId", isAuthenticated, getUserById);
router.put("/update/:id",isAuthenticated,singleUpload,updateUser);
export default router;