import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')): {cartItems:[]
}
const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers:{
      addToCart: (state,action)=>{
         const {quantity,product} = action.payload

         const itemIndex = state.cartItems.findIndex((item)=>{
            return item.product._id == product._id
         }) //if the item doesnt exist will return -1 if yes return its index

         if(itemIndex != -1){
            state.cartItems[itemIndex].quantity += quantity
            if(state.cartItems[itemIndex].quantity == 0){
              state.cartItems = state.cartItems.filter((x)=>{
                  return x !== state.cartItems[itemIndex]
               })
            }
            // if(state.cartItems[itemIndex].quantity == product.quantityInStock){
            // }
         }else{
            state.cartItems.push({product , quantity})
         }

         state.productsTotalPrice = 0
          state.cartItems.map((x)=>{
            return state.productsTotalPrice +=  (x.product.offer? x.product.productPrice * (1 - x.product.discountPercent / 100) : x.product.productPrice) * x.quantity
            // (x.product.productPrice * x.quantity)
         })
         
         state.shippingPrice;
          state.productsTotalPrice > 100 ? state.shippingPrice= 0 : state.shippingPrice= 4

          state.orderTotal = state.shippingPrice + state.productsTotalPrice

         localStorage.setItem('cart' , JSON.stringify(state))
      },

      removeFromCart: (state, action)=>{
         const product = action.payload

         const itemIndex = state.cartItems.findIndex((x)=>{
            return x.product._id == product._id
         })
         state.cartItems = state.cartItems.filter((x)=>{
            return x !== state.cartItems[itemIndex]
         })

         state.productsTotalPrice = 0
          state.cartItems.map((x)=>{
            return state.productsTotalPrice += (x.product.productPrice * x.quantity)
         })
         
         state.shippingPrice;
          state.productsTotalPrice > 100 ? state.shippingPrice= 0 : state.shippingPrice= 4

          state.orderTotal = state.shippingPrice + state.productsTotalPrice

         localStorage.setItem('cart' , JSON.stringify(state))

         localStorage.setItem('cart' , JSON.stringify(state))
      }


   }
})


export const {addToCart, removeFromCart} = cartSlice.actions
export default cartSlice.reducer