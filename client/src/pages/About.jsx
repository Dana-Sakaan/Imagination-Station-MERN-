import React, { useState } from 'react'
import store1 from "../images/store1.png"
import logo from "../images/logo.jpeg"
import store2 from "../images/store2.png"
import contact from "../images/contact.png"
import {FaLocationDot} from "react-icons/fa6"
import Swal from 'sweetalert2'
import axios from 'axios'

function About() {
  const [contactData, setContactData] = useState({firstName: "",  lastName: '', email: '', message: ''})
  const [message, setMessage] = useState('')
  const [error,setError] = useState(false)


  const handleChange = (e)=>{
     setContactData({...contactData , [e.target.id]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        title: "Are you sure?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#0A7273",
        cancelButtonColor: "#d33",
        confirmButtonText: "Send",
      }).then((result) => {
        if (result.isConfirmed) {
          const res = axios.post(
        `http://localhost:8000/api/user/message`,
        contactData
      ).then((res)=>{
        setMessage(res.data.message)
      });
          Swal.fire({
            title: "Sent",
            text: "Your message reached the team",
            icon: "success",
          });
        }
      });
    } catch (error) {
     setError(error);
    }
  };

  return (
    <section className='text-color3'>
      <div className='m-[5%]'>
        <h1 className='text-2xl font-semibold text-color1'>About Us</h1>
        <div className='flex flex-col md:flex-row'>
          <img src={logo} alt="store image" className='mt-[7%] w-[90%] h-[20%] ml-[5%] rounded-md md:w-[40%] '  />
          <div className='w-[90%] ml-[5%] bg-white md:ml-[3%] md:h-fit mt-[8%] md:w-[50%] rounded-md '>
            <h2 className='text-color1 text-center text-1xl font-semibold'>About Us</h2>
          <p className='pb-7 pl-10 pt-3 text-lg' >Exciting, inspirational, fun! Every visit to The Imagination Station will be an experience you’ll want to remember again and again!</p>

          <p className='pb-7 pl-10 pr-10 text-lg'>Established in 2014, and with a network of stores throughout the Middle East, we believe we know what makes a great place to buy toys.</p>

          <p className='pb-7 pl-10 pr-10 text-lg'>We stock the toys and games you know and love – you’ll find Disney, Marvel, LEGO, Barbie, Ty, Paddington and Sylvanian Families to name just a few. We also stock some great new ranges, such as Star Wars, Shepperton Studios, Bonnie and Pearl, and our very own Mr Men character – Mr Fun!</p>

          <p className='pb-10 pl-10 pr-10 text-lg'>But it’s The Imagination Station experience you’ll really love – our store encourages kids to lose themselves in their imagination. With in-store entertainment, demonstrations and their best-loved characters coming to life, it’s an exciting and inspiring place to be!</p>
          </div>
        </div>

        <div className='flex flex-col md:flex-row'>
          <div className='w-[90%] ml-[5%] bg-white md:ml-[3%] md:h-fit mt-[2%] md:mt-[15%] md:w-[50%] rounded-md order-2 md:order-1'>
          <p className='pb-7 pl-10 pt-3 text-lg' >Discover the growing selection of toys at our store, making us one of the top choices in Lebanon for all your toy needs.</p>
          </div> 
          <img src={store1} alt="store image" className='order-1 mt-[7%] w-[90%] ml-[5%] rounded-md md:w-[40%] md:order-2 '  />
        </div>
      </div>

      <div>
      <h1 className='text-2xl font-semibold text-color1 ml-8'>Contact Us</h1>
      <div className='flex flex-col md:flex-row'>
          <img src={contact} alt="store image" className='mt-[7%] w-[90%] h-[20%] ml-[5%] rounded-md md:w-[40%] '  />
          <div className='bg-white md:ml-[3%] md:h-fit mt-[12%] md:w-[50%] rounded-md w-[90%] ml-[5%]'>
          <h2 className='text-color1 text-center text-1xl font-semibold'>Get in touch!</h2>
          <p className='ml-5'>We're here to assist you! Let us know how we can help. and our team will do its best to meet your needs</p>
          <form className='ml-5 mt-3 flex flex-col' onSubmit={handleSubmit}>
            <div className='mb-2'>
              <input type="text" placeholder='First name' id='firstName' onChange={handleChange}  className='border-2 rounded-lg p-2 border-gray-500 mr-5'/>
              <input type="text" placeholder='Last name' id='lastName' onChange={handleChange}  className='border-2 rounded-lg p-2 border-gray-500 '/>
            </div>
            <input type="email" placeholder='Email' id='email' onChange={handleChange} required className='border-2 rounded-lg p-2 border-gray-500 mb-2 w-[94%]'/>
            <textarea id="message" placeholder='Message' onChange={handleChange} className='border-2 rounded-lg p-2 border-gray-500 mb-2 w-[94%]'></textarea>
            <button className='bg-color3 w-fit text-lg mb-3 text-center items-center text-color4 p-2 rounded-md'>Submit</button>
            {message&& <p className='text-xl'>{message}</p>}
            {error&& <p className='text-xl text-red-700'>{error}</p>}
          </form>
          
          </div>
        </div>


        <div className='flex flex-col md:flex-row mb-5'>
          <div className='bg-white md:ml-[3%] md:h-fit mt-[2%] md:mt-[15%] md:w-[40%] rounded-md order-2 md:order-1 w-[90%] ml-[5%] text-center '>
          <h2 className='text-1xl font-semibold text-color1'>Find our Store</h2>
          <div>
            <div className='flex items-center justify-center'>
            <FaLocationDot className='mr-2 text-color4 text-xl'/>
            <h3 className='text-1xl'>Beirut</h3>
            </div>
            <p className='text-lg'>Highway Dbayeh (Metn) Baabda</p>
            <p className='text-xl'>Whatsapp:+961 00/000000</p>
          </div>
          </div> 
          <img src={store2} alt="store image" className='order-1 mt-[7%] w-[90%] ml-[5%] rounded-md md:w-[40%] md:order-2 '  />
        </div>

      </div>
    </section>
  )
}

export default About
