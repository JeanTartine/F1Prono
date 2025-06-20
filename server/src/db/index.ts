import 'dotenv/config';
import mongoose from "mongoose";
import dotenv from "dotenv";


// Connect to Atlas cluster
export const connectDB = async () => {
    dotenv.config();
    try{
        await mongoose.connect(process.env.MONGODB_URI!)
        console.log("MongoDB Connected");
    } catch (error: any) {
        console.log("MongoDB connection error: " + error.message);
    }
}
