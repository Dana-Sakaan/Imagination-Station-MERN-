import { useSelector } from "react-redux"
import { Outlet, Navigate } from "react-router-dom"

function AuthorizeRoute() {

   const {currentUser} = useSelector((state)=> state.user)
  return (


    currentUser.role == "admin" ? <Outlet/> : <Navigate to="/"/>

  )
}

export default AuthorizeRoute
