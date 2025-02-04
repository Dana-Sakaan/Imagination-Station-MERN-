const express = require("express")
require("dotenv").config()
const connectDB = require("./database").connectDB;
const authRoutes = require("./routes/authRoute");
const productRoutes = require("./routes/productRoute")
const userRoutes = require("./routes/userRoute")
const orderRoutes = require("./routes/orderRoute")
const cookieParser = require("cookie-parser")
const cors = require("cors")

//config
const app = express()
connectDB();

//middlewares
app.use(cors({
   origin: 'http://localhost:5173', 
   credentials: true
}))
app.use(express.json())
app.use(cookieParser())
//error handling middleware
app.use((err,req,res,next)=>{
   return res.status(err.status || 500).json({
      error:{
         status:err.status || 500,
         message: err.message || 'Internal Server Error'
      }
   })
})


//routes
app.use("/api/auth",authRoutes )
app.use("/api/product", productRoutes )
app.use("/api/user", userRoutes )
app.use("/api/order", orderRoutes)

//config
app.listen(process.env.PORT , ()=>{
   console.log(`App is running ON PORT ${process.env.PORT}`)
})