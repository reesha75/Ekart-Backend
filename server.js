import 'dotenv/config';
import express from "express";
import connectDB from "./db/db.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoute from "./routes/cartRoute.js"
import orderRoute from "./routes/orderRoute.js"
import paymentRoute from "./routes/paymentRoute.js"
import cors from 'cors'
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Needed for PayFast ITN webhook (form-urlencoded)
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || /^http:\/\/localhost:\d+$/.test(origin)) {
            callback(null, true);
            return;
        }
        callback(new Error('Not allowed by CORS'));
    },
    credentials: true
}));
connectDB();

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/cart', cartRoute);
app.use('/api/v1/order', orderRoute);
app.use('/api/v1/payment', paymentRoute);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
   
});