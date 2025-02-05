import express from 'express'
import dotenv from 'dotenv'

import connectDB from "./db/index.js";
import { app } from './app.js';

dotenv.config({
    path:"./.env"
})
connectDB()
.then(()=>{
    app.on("error",(error)=>{
        console.error("ERROR :Express Application cannot talk to database");
    })
    
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`Server is running on port ${process.env.PORT}`)
    }
    )
})
.catch((error)=>{
    console.log("Mongodb connection failed!!!",error)
})
