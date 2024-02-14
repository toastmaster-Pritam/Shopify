import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js'
import authroute from './routes/AuthRoute.js'
import cors from 'cors'
import categoryroute from './routes/categoryRoute.js'
import productroute from  './routes/productroute.js'
import path from 'path'
import { fileURLToPath } from 'url'

//creating server
const app=express()

dotenv.config()

//Database Connection
connectDB();

const __filename= fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)

//middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname,'./client/build')))

//Dotenv listen


//routes
app.use("/api/v1/auth",authroute)
app.use("/api/v1/category",categoryroute)
app.use("/api/v1/product",productroute)

app.use('*',function(req,res){
    res.sendFile(path.join(__dirname,'./client/build/index.html'))
})

//lisstening port
const port= process.env.PORT || 8080
app.listen(port,()=>{
    console.log(`Server is running in ${process.env.DEV_MODE} at port ${port}`)
})