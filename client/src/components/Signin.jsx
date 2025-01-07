import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link ,useNavigate} from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { actionFailure,actionStart,actionSuccess } from "../redux/userSlice";
import OAuth from "./OAuth";


function Signin() {

  const [formData, setFormData] = useState({})
  const {error , loading}= useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e)=>{
    setFormData({...formData , [e.target.id]: e.target.value})
  }

  const handleSubmit = async (e)=>{
    console.log(formData)
    e.preventDefault()
     try {
       dispatch(actionStart())
       console.log('line 1')
       const res = await axios.post("http://localhost:8000/api/auth/signin", formData , {withCredentials: true})
        console.log("line 3")
       
        dispatch(actionSuccess(res.data.validUser))
        navigate("/profile")

        console.log(res.data.validUser)

     } catch (error) {
      dispatch(actionFailure(error.response.data.message))
      console.log(error)
      console.log("error in catch")
     }
  }

  return (
    <div className=" w-[90%] ml-[5%] bg-primary flex flex-col  justify-center  sm:w-[45%] mt-[10%] sm:ml-[30%]  font-semibold rounded-sm">
        
  
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <h2 className=" place-self-center text-2xl mt-[15px] mb-[25px] text-text4">Sign In</h2>

           <label className="ml-[2%] text-1xl mt-[8px] text-text4">Email:</label>
           <input type='email' required  id="email"
           onChange={handleChange}
            className="w-[92%] ml-[4%] rounded-md p-1 mt-[8px]"/>

           <label className="ml-[2%] text-1xl mt-[8px] text-text4">Password:</label>
           <input type='password' id="password"
           required 
           onChange={handleChange}
            className="w-[92%] ml-[4%] rounded-md p-1 mt-[8px]"/>

            <p className="text-text3 mt-[5px] ml-[4%]">You dont have an account? <Link to='/signup' className="text-secondary underline">Sign up</Link></p> 

           <button disabled={loading} className="w-fit bg-secondary mt-[30px] text-lg pr-4 pl-4 pt-2 pb-2 rounded-md place-self-center ">{loading? 'Loading...' : 'Sign in'}</button>
            
            <OAuth/>
            
            </form>
         {error && <p className="text-red-700 place-self-center text-lg">{error}</p>}
      </div>
  )
}

export default Signin
