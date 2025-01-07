import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { useSelector } from 'react-redux'

function Wishlist() {

  const [wishlistItems , setWishlistItems] = useState([])
  const {wishlist} = useSelector((state)=> state.wishlist) //will help in rerendering the component

  useEffect(()=>{
      const wishlistArray = JSON.parse(localStorage.getItem('wishlist'))
      if(wishlistArray){
        setWishlistItems(wishlistArray.wishlist)
        console.log(wishlistArray.wishlist)
      }
  },[wishlist])

  

  return (
    <section>
      <h1 className='mt-[32px] ml-[7%] text-1xl text-primary font-bold md:ml-[5%]'>Wishlist Products:</h1>
      <div className='flex flex-wrap mt-[5%]'>
        {wishlistItems && wishlistItems.map((product)=>{
          return(
            <div className="w-[90%] ml-[5%] ss:w-[45%] md:w-[30%] ss:ml-[3%]">
            <ProductCard key={product._id} product={product}/>
            </div>
          )
        }) }
      </div>
    </section>
  )
}

export default Wishlist
