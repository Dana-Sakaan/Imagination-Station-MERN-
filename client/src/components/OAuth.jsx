import { app } from "../utils/firebase"
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth"
import axios from "axios"
import { actionFailure, actionStart, actionSuccess } from "../redux/userSlice"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { FaGoogle } from "react-icons/fa";

function OAuth() {
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const handleGoogleAuth = async () =>{
      try {
         dispatch(actionStart())
         const provider = new GoogleAuthProvider()
         const auth = getAuth(app)
         const result = await signInWithPopup(auth, provider)

         const body = { name: result.user.name, email: result.user.email}

         const res = await axios.post("http://localhost8000/api/auth/google", body)

         console.log(res)

         dispatch(actionSuccess(res.data.user))
         navigate("/profile")


      } catch (error) {
         dispatch(actionFailure(error.response.data.message))
      }
   }


  return (
    <button type="button" onClick={handleGoogleAuth} className="text-lg p-2 place-self-center mt-[15px] mb-[20px] text-text4 border-solid border-2 border-secondary">
      <FaGoogle className="inline mr-2 text-red-700"/> Continue with Google
    </button>
  )
}

export default OAuth
