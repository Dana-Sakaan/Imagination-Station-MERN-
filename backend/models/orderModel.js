const mongoose = require("mongoose")
const Schema = mongoose.Schema

const orderSchema = new Schema({
   email: {
      type: String,
      required:true
   },
   address: {
      type: String,
      required:true
   },
   phoneNumber: {
      type: Number,
      required:true,
      minLength: 8,
      maxLength: 8
   },
   discountTotal:{
      type: Number
   },
   // payment: {
   //    type: String,
   //    required:true
   // },
   // products:[{}],

   // points: {
   //    type:Number,
   //    default: 0
   // },
   isPaid:{
      type:Boolean,
      default: false
   },
   isDelivered:{
      type:Boolean,
      default: false
   },
   cartItems : {
      type: Array,
      required: true
   },
   orderTotal:{
      type:Number,
      required:true
   },
   shippingTotal:{
      type:Number,
      required:true
   },
   productsTotal:{
      type:Number,
      required:true
   },
   orderStatus:{
      type: String,
      enum: ['Completed' , 'Canceled', 'Incompleted'],
      default: 'Incompleted'
   }
   // paidAt: {
   //    type: Date()
   // },
   // deliveredAt: {
   //    type: Date()
   // },
},{
   timestamps: true
})

const Order = mongoose.model("Order", orderSchema)
module.exports = Order