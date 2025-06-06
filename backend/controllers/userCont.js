const User = require('../models/UserModel.js')
const Message = require('../models/messageModel.js');
const Order = require('../models/orderModel.js');

const getProfile = async (req,res, next)=>{

   try {
      //  console.log(req.user._id)
      //  console.log(req.params.id)

      if (req.user._id != req.params.id){
         return res.status(403).json({success: false, message: "your not the owner of this profile"})
      }
      const user = await User.findById(req.params.id);
      if(!user){
         return res.status(404).json({success: false, message: "NO Account"})
      }
      res.status(200).json({success: true, message: "your Account", user})
   } catch (error) {
     next(error)
   }
}

const orderHistory = async (req,res,next)=>{
   try {
      const page = parseInt(req.query.ordersPage) - 1
      if (req.user._id != req.params.id){
         return res.status(403).json({success: false, message: "your not the owner of this profile"})
      }

      const user = await User.findById(req.params.id);
      if(!user){
         return res.status(404).json({success: false, message: "NO Account"})
      }
      const userOrders = await Order.find({email: user.email}).limit(3).skip(page*3)
      res.status(200).json({success:true, message:"users orders" , userOrders})
   } catch (error) {
      next(error)
   }
}

const updateProfile = async (req,res,next)=>{
   try {
      if (req.user._id != req.params.id){
         return res.status(403).json({success: false, message: "your not the owner of this profile"})
      }
      const id = req.params.id
      const user = await User.findByIdAndUpdate( id, req.body, {new:true}); 
      if(!user){
         return res.status(404).json({success: false, message: "NO Account"})
      }
      res.status(200).json({success: true, message: "profile updated successfully", user})
   } catch (error) {
      next(error)
   }
}

const deleteProfile = async (req,res, next)=>{
   try {
      if (req.user._id != req.params.id){
         return res.status(403).json({success: false, message: "your not the owner of this profile"})
      }
      const user = await User.findByIdAndDelete(req.params.id); 
      res.status(200).json({success: true, message: "account deleted successfully"})
   } catch (error) {
     next(error)
   }
}

const addToWishlist = async (req, res, next)=>{
   try {
      const user = req.user
      const productID = req.params.id
      // const productExist = await User.find({ wishlist :productID})
      // console.log(productExist)

      if(user.wishlist.includes(productID)){
         user.wishlist.filter((i)=>{ i != productID})
          res.status(200).json({message: "product removed"})
         console.log("product removed")
      }else{
         user.wishlist.push(productID)
         console.log("product added")
         res.status(200).json({message: "product added"})
      }
   } catch (error) {
      console.log(error)
   }
}

const pointsDiscount = async (req,res,next)=>{
   try {
      const id = req.params.id
      const user = await User.findById(id)
      console.log(0)
      console.log(user)
      const newPoints = user.points - 5;
      console.log(1)
      const updatedUser =await User.findByIdAndUpdate(id, {points:newPoints}, {new:true})
      console.log(updatedUser)
      console.log(2)
      res.status(200).json({success:true, message:"discount applied"})
   } catch (error) {
      next(error)
   }
}

const userMessage = async (req,res,next)=>{

   try {
      const message = await Message.create(req.body)
      res.status(201).json({success:true, message: 'Our team will reach you soon'})
   } catch (error) {
      next(error)
   }
}

const getMessages = async (req,res,next)=>{
   try {
      const sorting = req.query
      const page = parseInt(sorting.page) || 1
      const skip = (page-1) * 10
      const messages = await Message.find({status:sorting.status}).skip(skip).limit(10)
      return res.status(200).json({success:true, message:"Users messages", messages})
   } catch (error) {
      next(error)
   }
}

const messageStatus = async (req,res,next)=>{
   try {
      const {status} = req.body
      const message = await Message.findByIdAndUpdate(req.params.id , {status}, {new:true})
      return res.status(200).json({success:true, message:"Message is answered"})
   } catch (error) {
      next(error)
   }
}

module.exports = {getProfile , updateProfile, userMessage, messageStatus,getMessages,deleteProfile,addToWishlist, pointsDiscount,orderHistory}