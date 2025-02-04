import React, { useEffect, useState } from 'react'
import axios from "axios"
import Swal from 'sweetalert2';
import { FaDotCircle } from "react-icons/fa";

function UserMessages() {
   const [messages,setMessages] = useState([])
   const [error,setError] = useState(false)
   const [data,setData]= useState({status:"Not Answered", page:1})

  
  const handleChange = (e)=>{
    setData({...data, [e.target.id]: e.target.value})
  }

   const filteringData = new URLSearchParams(data).toString()
   const getMessages = async () => {
     try {
       const res = await axios.get(
         `https://imagination-station-be.onrender.com/api/user/getmessages?${filteringData}`,
         { withCredentials: true }
       );
       setMessages(res.data.messages)
     } catch (error) {
       setError(error);
       console.log(error)
     }
   };


   const SubmitMessageState = async (id)=>{
    try {

      const result = await Swal.fire({
        title: "Did you answer this message?",
        text: "You won't be able to revert this!",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
      })

      if(result.isConfirmed){
        const res = await axios.put(`https://imagination-station-be.onrender.com/api/user/messagestatus/${id}`, {status: "Answered"}, {withCredentials:true})
        await Swal.fire({
                title: "Answered!",
                icon: "success"
              });
      }
    } catch (error) {
      setError(error)
    }
   }

   useEffect(()=>{getMessages()}, [data])

  return (
    <section>
      <h1 className='text-1xl text-color1 font-semibold ml-8'>Client Messages</h1>
      <form>
        <select id='status' className='text-lg ml-8 mt-5 bg-color3 text-color4 p-1 rounded-md' onChange={handleChange}>
          <option value="Not Answered">Not Answered</option>
          <option value="Answered">Answered</option>
        </select>
      </form>
      {error && <p className='text-lg text-red-700'>{error}</p>}
      <div className=''>
     {messages.length>0 ? messages.map((message)=>(
      <div className='bg-white m-10 p-3 rounded-sm w-[110%]'>
        <FaDotCircle className={`${message.status == 'Answered'? "text-green-700" : "text-red-700"}`}/>
        <h2 className='text-xl text-color1'>Email: <span className='text-color3'>{message.email}</span></h2>
        <h3 className='text-xl text-color1'>Name: <span className='text-color3'>{message.firstName} {message.lastName}</span></h3>
        <p className='text-xl text-color1'>Message: <span className='text-color3'>{message.message}</span></p>
        <button disabled={message.status == 'Answered'} className='bg-color3 text-color4 text-lg p-2 rounded-md mt-3' onClick={()=>{SubmitMessageState(message._id)}}>Answered</button>
      </div>
     )) : ""}
     </div>
    </section>
  )
}

export default UserMessages
