const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("bcrypt")

const userSchema = new Schema({
   name:{
      type:String,
      required:true,
   },
   password:{
      type:String,
      required:true,
   },
   email:{
      type:String,
      required:true,
      unique:true
   },
   address:{
      type:String,
      // required:true,
   },
   phoneNumber:{
      type:Number,
      // required:true,
      maxLength: 8,
      minLength: 8,
   },
   // paymentMethod:{},
   // orderHistory:{},
   points:{
      type:Number,
      default: 0
   },
   role:{
      type:String,
      default: "User",
   }

},{timestamps:true})


userSchema.pre("save", async function(next){
   try {
      if(!this.isModified('password')) return next()

      this.password = await bcrypt.hash(this.password,12)
   } catch (error) {
      console.log(error)
   }
})

userSchema.methods.checkPassword = async function(candidatePassword,userPassword){

   return await bcrypt.compare(candidatePassword , userPassword)
}



const User = mongoose.model('User', userSchema)
module.exports = User