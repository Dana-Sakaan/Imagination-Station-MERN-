import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import { useDispatch, useSelector } from "react-redux";
import { actionStart,actionFailure,actionSuccess } from "../redux/userSlice";
import OAuth from "./OAuth";

function Signup() {

   const [formData, setFormData] = useState({})
   const {loading,error} = useSelector((state)=> state.user)
   const dispatch = useDispatch()
   const navigate = useNavigate()


  const handleChange = (e)=>{
    setFormData({...formData , [e.target.id]:e.target.value})
  }


  const handleSubmit = async (e)=>{
    e.preventDefault()
     try {
       dispatch(actionStart())
       console.log('line 1')
       const res = await axios.post("http://localhost:8000/api/auth/signup", formData, {withCredentials:true})
        console.log("line 3")
       
        dispatch(actionSuccess(res.data.newUser))
        navigate("/profile")

        console.log(res.data.newUser)

     } catch (error) {
      dispatch(actionFailure(error.response.data.message))
      console.log(error)
      console.log("error in catch")
     }
  }

   return (
      <div className=" w-[90%] ml-[5%] bg-primary flex flex-col  justify-center  sm:w-[45%] mt-[10%] sm:ml-[30%]  font-semibold rounded-sm">
        
  
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <h2 className="text-text4 place-self-center text-2xl mt-[15px] mb-[25px]">Sign up</h2>

          <label className="ml-[2%] text-1xl mt-[8px] text-text4">Name:</label>
           <input type='text' required  id="name" onChange={handleChange}
            className="w-[92%] ml-[4%] rounded-md p-1 mt-[8px]"/>

           <label className="ml-[2%] text-1xl mt-[8px] text-text4">Email:</label>
           <input type='email' required id="email"  onChange={handleChange}
            className="w-[92%] ml-[4%] rounded-md p-1 mt-[8px]"/>

           <label className="ml-[2%] text-1xl mt-[8px] text-text4">Password:</label>
           <input type='password' required id="password" onChange={handleChange}
            className="w-[92%] ml-[4%] rounded-md p-1 mt-[8px]"/>

            <p className="text-text3 mt-[5px] ml-[4%]">You have an account? <Link to='/signin' className="text-secondary underline">Sign in</Link></p> 

           <button disabled={loading} type="submit"
              className="w-fit bg-secondary mt-[30px] text-lg pr-4 pl-4 pt-2 pb-2 rounded-md place-self-center text-text2">{loading ? "Loading..." : "Sign Up"}</button>
           <OAuth/>
           {error && <p className="text-red-700 place-self-center text-lg">{error}</p>}
        </form>
      </div>
    )
}

export default Signup
