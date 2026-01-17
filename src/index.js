import mongoose from 'mongoose'
import dotenv from 'dotenv'
import express from 'express'
import connectDB from './db/index.js'
dotenv.config({
    path:'./env'
})
const app = express()
connectDB()
.then(()=>{
    app.listen(process.env.PORT||8000,()=>{
        console.log(`process is running on port : ${process.env.PORT}`)
    })
})
.catch((error)=>{
    console.log(`error in connecting connectDB`,error)
})