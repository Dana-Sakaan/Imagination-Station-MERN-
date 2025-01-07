const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const isAuth = async (req,res,next)=>{
   const token = req.cookies.jwtAccess;

   if(!token){
      return res.status(403).json({success: false,message: "UnAuthorized1"})
   }
   const validTokenPayload =  jwt.verify(token, process.env.JWTSECRET)
   // console.log(validTokenPayload)
   if(!validTokenPayload){
      return res.status(403).json({success: false,message: "UnAuthorized2"})
   }
   const user = await User.findById(validTokenPayload.id)
   if(!user){
      return res.status(403).json({success: false,message: "UnAuthorized3"})
   }
   req.user = user
   // console.log(req.user)
   next()
}

const isAdmin = async (req,res,next)=>{
   const token = req.cookies.jwtAccess;
   

   if(!token){
      return res.status(403).json({success: false,message: "UnAuthorized"});
   }
   const validTokenPayload =  jwt.verify(token, process.env.JWTSECRET)
   // console.log(validTokenPayload)
   if(!validTokenPayload){
      return res.status(403).json({success: false,message: "UnAuthorized"});
   }
   const user = await User.findById(validTokenPayload.id)
   if(!user){
      return res.status(403).json({success: false,message: "UnAuthorized"});
   }
   //  console.log(user)
   if(user.role !== "admin"){
      return res.status(403).json({success: false,message: "UnAuthorized"});
   }
   //  req.user = user
   // console.log(req.user)
   next()
}

module.exports = {isAuth, isAdmin}