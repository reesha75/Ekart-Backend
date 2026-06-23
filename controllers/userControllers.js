import { User } from "../models/usermodel.js";

import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

import { verifyEmail } from "../emailVerify/verifyEmail.js";
import {Session} from "../models/sessionModel.js";

import { sendOTPmail } from "../emailVerify/sendOTPmail.js";

import cloudinary from "../utils/cloudinary.js"
export const registerUser = async (req, res) => {

    try {

        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {

            return res.status(400).json({ success: false, message: "All fields are required" });

        }



        const existingUser = await User.findOne({ email });

        if (existingUser) {

            return res.status(400).json({ success: false, message: "User already exists" });

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({

            firstName,
            lastName,
            email,
            password: hashedPassword

        });

        //token create krna ha ta k email verify ho ska

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "10m" });

        try {
            await verifyEmail(token, email);
        } catch (emailError) {
            console.error("Verification email failed:", emailError.message);
        }

        newUser.token = token;
        await newUser.save();

        const userResponse = newUser.toObject();
        delete userResponse.password;

        return res.status(201).json({

            success: true,

            message: "User registered successfully. Please check your email to verify your account.",

            user: userResponse

        });



    } catch (error) {

        return res.status(500).json({

            success: false,

            message: "Server error",

            error: error.message

        });

    }

};

//vreify email token and mark user as verified
 export const verify = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        //Technical Zabaan mein:
             //Bearer Token = Access Token: Jab aap login karte hain, server aapko ek JWT (JSON Web Token) deta hai.
              //Authorization Header: Jab aap agli baar server ko koi data lene ke liye request bhejte hain, toh aap browser/client se kehte hain: "Yeh lo mera token, main 'Bearer' hoon, mujhe access do."
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "Token missing" });
        }

        const token = authHeader.split(" ")[1];
        
        // 1. Token Verify karein
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            // If token expired, offer resend by decoding token to get user id
            if (error.name === 'TokenExpiredError') {
                try {
                    const decodedPayload = jwt.decode(token);
                    const userId = decodedPayload?.id;
                    if (userId) {
                        const userForResend = await User.findById(userId);
                        const emailForResend = userForResend?.email;
                        return res.status(400).json({ success: false, message: 'Token expired', action: 'resend', email: emailForResend });
                    }
                } catch (e) {
                    // fallthrough to generic response
                }
            }
            return res.status(401).json({ success: false, message: "Invalid or expired token" });
        }

        // 2. Database mein check karein ke kya yeh user exist karta hai
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // 3. Check karein ke token match karta hai (taki koi purana ya wrong token use na ho)
        if (user.token !== token) {
            return res.status(400).json({ success: false, message: "Token already used or invalid" });
        }

        // 4. User ko 'verified' mark karein
        user.isVerified = true;
        user.token = null;      // Ek baar verify hone ke baad token null kar dein
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Email verified successfully"
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

//reverify email for login
export const reverifyEmail = async (req, res) => {
    const {email} = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ 
                success: false,
                 message: "User not found"
                 });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "10m" });
        await verifyEmail(token, email);
        user.token = token;
        await user.save();
        return res.status(200).json({
            success: true,
            message: "Verification email sent successfully",
            token: user.token
        });
    }
 catch(error){
       res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message
       });
 }
}

//login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Validation
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // 2. Find User
        const existingUser = await User.findOne({ email });
        if (!existingUser || !(await bcrypt.compare(password, existingUser.password))) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        // 3. Verify Email Check
        if (!existingUser.isVerified) {
            return res.status(403).json({ success: false, message: "Please verify your email first" });
        }

        // 4. Session Management: Purane sessions delete karein (Single Session Policy)
        await Session.deleteMany({ userId: existingUser._id }); 

        // 5. Generate Tokens
        const accessToken = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        const refreshToken = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "30d" });

        // 6. Create New Session in DB
        await Session.create({ userId: existingUser._id, refreshToken: refreshToken });

        // 7. Update User Status in Database
        existingUser.isLoggedIn = true; // Schema ke mutabiq field update ki
        await existingUser.save();

        // 8. Prepare Response (Password remove karna zaroori hai)
        const userResponse = existingUser.toObject();
        delete userResponse.password; // Hash password ko hataya

        return res.status(200).json({
            success: true,
            message: "Login successful",
            accessToken,
            refreshToken,
            user: userResponse // Ab ismein isLoggedIn: true hoga
        });

    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: "Server error", 
            error: error.message 
        });
    }
};

export const logoutUser = async (req, res) => {
    try {
        const userId = req.user?._id || req.user?.id; // Middleware se aayi ID

        if (!userId) {
            return res.status(400).json({ success: false, message: "Unable to identify user" });
        }

        // 1. Session delete karein (Logout from DB)
        await Session.deleteMany({ userId });

        // 2. User status update karein
        await User.findByIdAndUpdate(userId, { isLoggedIn: false });

        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

export async function forgotPassword(req, res) {
    const { email, phoneNo } = req.body;
    try {
        let user;
        if (email) {
            user = await User.findOne({ email });
        } else if (phoneNo) {
            user = await User.findOne({ phoneNo });
        }

        if (!user) {
            return res.status(404).json({ 
                success: false, message: "User not found"
             });
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
        const otpExpiry = Date.now() + 5 * 60 * 1000; // OTP valid for 5 minutes
        user.otp = otp;
        user.otpExpiry = otpExpiry;
        await user.save();

        if (email) {
            await sendOTPmail(otp, email); // OTP email bhejne ka function
        } else if (phoneNo) {
            console.log(`\n==========================================\n[SMS OTP SIMULATION] Sent OTP code ${otp} to phone number: ${phoneNo}\n==========================================\n`);
        }

        return res.status(200).json({
            success: true,
            message: "OTP sent successfully"
        });
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
}

export const verifyOtp = async (req, res) => {
    try {
        const { otp } = req.body;
        const { email } = req.params; // this can be email or phone number

        console.log("DEBUG - Target received:", email);
        console.log("DEBUG - OTP received:", otp);

        // 1. Basic Validation
        if (!otp) {
            return res.status(400).json({ 
                success: false, 
                message: "OTP is required" 
            });
        }

        // 2. User ko find karein (using email or phoneNo matching the param)
        const user = await User.findOne({
            $or: [{ email: email }, { phoneNo: email }]
        });
        console.log("DEBUG - Found User object:", user);

        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: "User not found" 
            });
        }

        // 3. OTP aur Expiry Check
        if (!user.otp) {
            return res.status(400).json({ 
                success: false, 
                message: "OTP not found. Please request a new one." 
            });
        }

        // OTP expiry check
        if (Date.now() > user.otpExpiry) {
            return res.status(400).json({ 
                success: false, 
                message: "OTP has expired. Please request a new one." 
            });
        }

        // OTP match check
        if (user.otp !== otp) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid OTP. Please try again." 
            });
        }

        // 4. Verification Successful
        // Clear OTP so it cannot be used again
        user.otp = null; 
        user.otpExpiry = null;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "OTP verified successfully. You can now set your new password."
        });

    } catch (error) {
        console.error("OTP Verification Error:", error);
        return res.status(500).json({ 
            success: false, 
            message: "Internal server error" 
        });
    }
};

export const ChangePassword = async (req, res) => {
    console.log("Middleware check - req.body:", req.body);
    console.log("Middleware check - req.params:", req.params);
    try {
        const { newPassword, confirmPassword } = req.body;
        const email = req.params.email.trim(); // can be email or phone number
        // Check if data reached
        if (!newPassword || !confirmPassword) {
            return res.status(400).json({ 
                success: false, 
                message: "All fields are required" 
            });
        }

        // Check password match
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ 
                success: false, 
                message: "Passwords do not match" 
            });
        }

        const user = await User.findOne({
            $or: [{ email: email }, { phoneNo: email }]
        });
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: "User not found" 
            });
        }

        // Hash and Save
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({ 
            success: true, 
            message: "Password changed successfully" 
        });

    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: "Server error", 
            error: error.message 
        });
    }
}

//GET all users....admin only
export const getAllUsers = async (req, res) => {
    try{
    const users= await User.find()
    return res.status(200).json({
        success: true,
        users
    });
    } catch(error){
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
}
//getuser by id...admin only
export const getUserById = async (req, res) => {
    try {
        // Yahan 'userId' karein, kyunki route mein '/:userId' hai
        const { userId } = req.params; 
        
        const user = await User.findById(userId).select("-password -otp -otpExpiry -token");
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        return res.status(200).json({
            success: true,
            user
        });
    } catch(error){
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
}
export const updateUser = async (req, res) => {
  try {
    const userIdToUpdate = req.params.id;
    const loggedInUser = req.user;

    const {
      firstName,
      lastName,
      address,
      city,
      zipCode,
      phoneNo,
      role,
      profilePic
    } = req.body;

    // Authorization Check
    if (
      loggedInUser._id.toString() !== userIdToUpdate &&
      loggedInUser.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update this profile",
      });
    }

    // Find User
    let user = await User.findById(userIdToUpdate);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Existing Profile Picture
    let profilePicUrl = user.profilePic;  //pic ka url existing
    let profilePicPublicId = user.profilePicId;  //cloudinary id existing pic

    // If New Image Uploaded
    if (req.file) {
      // Delete old image from Cloudinary
      if (profilePicPublicId) {
        await cloudinary.uploader.destroy(profilePicPublicId);
      }

      // Upload new image
      //uploadstream async/await return nahi karta.  Wo callback use karta hai...pr hmyn aync use krna ha islia promise myn wrap krdia 
      const upload_result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "profiles",
          },
          (error, result) => {
            if (error) return reject(error); //if error promise fail  ur catch chl jye ga 
            resolve(result); // agr promise successfull to result k andr data ajta ha 
          }
        );

        stream.end(req.file.buffer);   //"Ye image Cloudinary ko bhej do."
      });
//save url and public id in cloudinary
      profilePicUrl = upload_result.secure_url;
      profilePicPublicId = upload_result.public_id;
    }

    // Update Fields
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.address = address || user.address;
    user.city = city || user.city;
    user.zipcode = zipCode || user.zipcode;
    user.phoneNo = phoneNo || user.phoneNo;
    user.profilePic = profilePicUrl;
    user.profilePicId = profilePicPublicId;

    // Only Admin Can Change Role
    if (loggedInUser.role === "admin" && role) {
      user.role = role;
    }

    const updatedUser = await user.save();

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};