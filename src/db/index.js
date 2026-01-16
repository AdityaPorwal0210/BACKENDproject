import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async ()=>{
    console.log(`here is my answer${process.env.MONGODB_URI}/${DB_NAME}`)
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`MongoDB connected DB host : ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log(`error in connecting DB `,error)
        process.exit(1)
    }
}
 export  default connectDB