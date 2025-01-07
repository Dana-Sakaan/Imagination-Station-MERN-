const mongoose = require("mongoose");
const Schema = mongoose.Schema

const productSchema = new Schema({
   productName:{
      type:String,
      required:true,
      unique: true,
   },
   productPrice:{
      type:Number,
      required:true,
   },
   quantityInStock:{
      type:Number,
      required:true,
      default:0
   },
   brand:{
      type:String,
      required:true,
   },
   age:{
      type:String,
      required:true,
   },
   category:{
      type:String,
      required:true,
   },
   offer:{
      type: Boolean,
   },
   discountPercent:{
      type:Number,
      default:0
   },
   productDescription:{
      type:String,
      required:true,
   },
   productImages:{
      type: Array,
      required:true
   },
  
},{timestamps:true})

const Product = mongoose.model('Product', productSchema)
module.exports = Product