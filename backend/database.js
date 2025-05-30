const mongoose = require('mongoose')

const connectDB = ()=>{
   try {
      mongoose.connect(process.env.MONGODB_URI).then(console.log("MongoDB connected"))
   } catch (error) {
      console.log(error)
      process.exit(1)
   }
}

module.exports = {connectDB}