import mongoose from "mongoose";
import dns from 'node:dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);

const connectDB=async()=>{
    try {
        console.log("Full URI being read:", process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI );
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};
export default connectDB;