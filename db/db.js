import mongoose from "mongoose";
import dns from 'node:dns';

if (process.env.NODE_ENV !== "production") {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
}

const connectDB=async()=>{
    try {
   
        await mongoose.connect(process.env.MONGO_URI );
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};
export default connectDB;