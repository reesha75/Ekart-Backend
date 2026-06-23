import { User } from "../models/usermodel.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const token = authHeader.split(" ")[1];

        // Token Verification
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            const isLogout = req.originalUrl && req.originalUrl.endsWith('/logout');
            if (error.name === "TokenExpiredError" && isLogout) {
                decoded = jwt.verify(token, process.env.JWT_SECRET, { ignoreExpiration: true });
            } else {
                if (error.name === "TokenExpiredError") {
                    return res.status(401).json({ success: false, message: "Token expired" });
                }
                return res.status(401).json({ success: false, message: "Invalid or expired token" });
            }
        }
        
        // Find User
        const user = await User.findById(decoded.id).select("-password"); // Password exclude karna zaroori hai
        
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        req.user = user; // Ab har route mein req.user access kar sakte hain
        
        next();

    } catch (error) {
        return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
};

//admin k lia authorization
export const isAdmin = (req, res, next) => {
    if (req.user && req.user.role == "admin") {
     next();
          }
    else{
        return res.status(403).json({ success: false, message: "Forbidden: Admins only" });
    }

};