import { createSlice } from "@reduxjs/toolkit";


const initialState = {
   currentUser : null,
   error: null,
   loading:false
}

const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers:{
      actionStart: (state)=>{
         state.loading = true
      },
      actionSuccess: (state,action)=>{
         state.currentUser = action.payload,
         state.error = null,
         state.loading = false
      },
      actionFailure: (state,action)=>{
         state.error = action.payload
         state.loading = false
      },
      endAction: (state,action)=>{
         state.loading = false,
         state.error = null,
         state.currentUser = null
      }
   }
})

export const { actionStart,actionSuccess,actionFailure,endAction} = userSlice.actions

export default userSlice.reducer