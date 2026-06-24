import mongoose from "mongoose";
import dns from 'node:dns';

if (process.env.NODE_ENV !== "production") {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
}

let isConnected = false;

const connectDB = async () => {
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI environment variable is missing! Please configure it in your Vercel project settings.");
    }

    if (isConnected || mongoose.connection.readyState >= 1) {
        console.log("Using existing MongoDB connection");
        isConnected = true;
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGO_URI);
        isConnected = db.connections[0].readyState === 1;
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        throw error;
    }
};
export default connectDB;