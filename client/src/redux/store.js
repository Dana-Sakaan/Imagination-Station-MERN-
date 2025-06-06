import { configureStore} from "@reduxjs/toolkit"
import userReducer from './userSlice'
import cartReducer from "./cartSlice"
import wishlistReducer from "./wishlistSlice"


export const store = configureStore({
   reducer:{
      user: userReducer,
      cart: cartReducer,
      wishlist: wishlistReducer
   },
   
   middleware: (getDefaultMiddleware)=> getDefaultMiddleware({
      serializableCheck: false
   })
})