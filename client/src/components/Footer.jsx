import { Link } from "react-router-dom"
import { FaInstagram, FaTiktok, FaFacebook } from "react-icons/fa";
import { useState } from "react";
import axios from "axios"

function Footer() {
  const [email,setEmail] = useState("")
  const [message, setMessage] = useState()
  const [error,setError] = useState()
  const [loading, setLoading] = useState(false)

  const handleChange = (e)=>{
    setEmail(e.target.value)
  }

  console.log(email)

  const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
      setLoading(true)
      const res = await axios.post('http://localhost:8000/api/auth/newsletter', {email: email})
      console.log(res
      )
      setMessage(res.data.message)
      setLoading(false)
    } catch (error) {
      setError(error)
      console.log(error)
    }
  }

  return (
    <footer className='bg-color1 mb-0 text-color2 flex flex-col items-center sm:flex sm:flex-row sm:justify-around'>
      <div className="mb-5 mt-10 sm:mb-10">
        <h2 className="text-1xl ">Imagination Station</h2>
        <p className="text-xl text-color4">The world of joy!</p>
      </div>
      <div className="ss:flex ss:gap-10 ss:mb-3">
      <form className="sm:mt-10 sm:mb-10" onSubmit={handleSubmit}>
        <p className="text-1xl">Subscribe to our newsletter</p>
        <label className="text-xl gap-1">Email:</label>
        <input type="email" className="text-black" onChange={handleChange}/>
        <button type="submit" disabled={loading} className="block text-lg bg-color3 text-color4 p-1 rounded-md mt-2">Subscribe</button>
        {message != '' && <p className="text-lg text-color4">{message}</p>}
        {error != '' && <p className="text-lg text-red-700">{error}</p>}
      </form>
      <div className="flex mt-5 sm:mt-10 sm:mb-10">
        <div>
          <p className="text-1xl">Follow Us</p>
          <div className="flex gap-3 text-xl">
            <Link to="" className="hover:text-color4"><FaInstagram/></Link>
            <Link to="" className="hover:text-color4"><FaFacebook/></Link>
            <Link to="" className="hover:text-color4"><FaTiktok/></Link>
          </div>
        </div>
        <div className="ml-6">
          <p className="text-1xl">Call Us</p>
          <p className="text-xl">00/000000</p>
        </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
