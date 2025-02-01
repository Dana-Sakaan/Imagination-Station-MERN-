const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const User = require("../models/UserModel")



const placeOrder = async (req, res, next )=>{
   try {
      const {customerData, cartItems,orderTotal,productsTotalPrice ,shippingPrice,discountTotal } =req.body
      console.log(customerData.email) 

      const userWithAccount = await User.findOne({email:customerData.email});
      console.log(0)
      for(let i=0; i<cartItems.length; i++){
         try {
            const product = await Product.findById(cartItems[i].product._id);
            // console.log(product)
         let newQuantity = 0;
         newQuantity = product.quantityInStock - cartItems[i].quantity;
         // console.log(newQuantity)
         const updated = await Product.findByIdAndUpdate(cartItems[i].product._id, {quantityInStock: newQuantity}, {new:true})
         // console.log(updated)
         } catch (error) {
            console.log(error)
         }
         
      }

      if(userWithAccount){
         console.log(1)
         const order = await Order.create(
            {
               email: userWithAccount.email,
               address: userWithAccount.address,
               phoneNumber: userWithAccount.phoneNumber,
               cartItems: cartItems,
               orderTotal: orderTotal,
               shippingTotal: shippingPrice,
               productsTotal: productsTotalPrice,
               discountTotal: discountTotal
            }
         )
         if(productsTotalPrice >40){ 
            userWithAccount.points = userWithAccount.points + 5
            userWithAccount.save()
         }
         return res.status(200).json({success:true, message: "Order created" , order})
      }else{
         const order = await Order.create(
            {
               email: customerData.email
               ,address: customerData.address
               ,phoneNumber: customerData.phoneNumber
               , cartItems: cartItems,
               orderTotal: orderTotal,
               shippingTotal: shippingPrice,
               productsTotal: productsTotalPrice
            }
         )
         return res.status(200).json({success:true, message: "Order created" , order})
      }
   } catch (error) {
      next(error)
   }
}

const getOrders = async (req,res, next)=>{
   try {
      const sortOrders = req.query;
      let page = parseInt(sortOrders.page)

      let sort;
      if(sortOrders.dateSort == "latest"){
         sort = -1
      }else{
         sort = 1
      }

      const orders = await Order.find({orderStatus: sortOrders.statusSort}).sort({createdAt: sort}).limit(10).skip((page-1) * 10)

      return res.status(200).json({orders, success:true, message:"customer orders"})
   } catch (error) {
      next(error)
   }
}

const getOrder = async (req,res, next)=>{
   try {
      const {id} = req.params
      const order = await Order.findById(id)
      return res.status(200).json({order, success:true, message:"customer orders"})
   } catch (error) {
      next(error)
   }
}

const orderStatus = async (req,res, next)=>{
   try {
      const {paymentStatus, deliveryStatus, completionStatus} = req.body
      console.log(paymentStatus)
      console.log(deliveryStatus)
      console.log(completionStatus)
      const order = await Order.findByIdAndUpdate(req.params.id, {isPaid:Boolean(paymentStatus), isDelivered: Boolean(deliveryStatus), orderStatus: completionStatus}, {new: true});
      res.status(200).json({success:true, message: "Order is completed"})
   } catch (error) {
      next(error)
   }
}

const cancelOrder = async (req,res, next)=>{
   
   try {
      const id = req.params.id;
      const status = req.body.status;

      const order = await Order.findByIdAndUpdate(id, {orderStatus: status}, {new:true})

      res.status(200).json({success:true, message: "Order is Canceled"})
   } catch (error) {
      next(error)
   }
}

module.exports = {placeOrder, getOrders, getOrder, orderStatus,cancelOrder}