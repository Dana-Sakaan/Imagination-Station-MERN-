import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem('wishlist') ? JSON.parse(localStorage.getItem('wishlist')) : {wishlist:[],
}

const wishlistSlice = createSlice({
   name: "wishlist",
   initialState,
   reducers:{
      addToWishlist: (state, action) =>{

         const product = action.payload;

         const productIndex = state.wishlist.findIndex((x)=>{
            return x._id == product._id
         })

         if(productIndex == -1){ //if product doesnt exist add it
            state.wishlist.push(product)
            state.counter = state.counter + 1 
         }else{ //if it does exist remove it
            state.wishlist = state.wishlist.filter((x)=>{
               return x._id !== product._id
            })
            state.counter = state.counter - 1 
         }

         localStorage.setItem('wishlist', JSON.stringify(state))

      },
   }
})

export const {addToWishlist} = wishlistSlice.actions
export default wishlistSlice.reducer