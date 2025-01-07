const User = require('../models/UserModel.js')

const getProfile = async (req,res)=>{

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
      console.log(error)
   }
}

const updateProfile = async (req,res)=>{
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
      console.log(error)
   }
}

const deleteProfile = async (req,res)=>{
   try {
      if (req.user._id != req.params.id){
         return res.status(403).json({success: false, message: "your not the owner of this profile"})
      }
      const user = await User.findByIdAndDelete(req.params.id); 
      res.status(200).json({success: true, message: "account deleted successfully"})
   } catch (error) {
      console.log(error)
   }
}

const addToWishlist = async (req, res)=>{
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

const pointsDiscount = async (req,res)=>{
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
      console.log(error)
   }
}

module.exports = {getProfile , updateProfile, deleteProfile,addToWishlist, pointsDiscount}