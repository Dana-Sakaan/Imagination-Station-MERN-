import { useSelector } from "react-redux"
import { Outlet, Navigate } from "react-router-dom"

function ProtectedRoute() {
   const {currentUser} = useSelector((state)=> state.user)
  return (
    
      currentUser? <Outlet/> : <Navigate to='/signin'/>
    
  )
}

export default ProtectedRoute
