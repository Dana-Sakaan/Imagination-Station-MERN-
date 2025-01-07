import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { removeFromCart, addToCart } from "../redux/cartSlice";
import { FaCircleMinus, FaCirclePlus} from "react-icons/fa6";
import axios from "axios";
import Swal from "sweetalert2";


function Cart() {
  const { currentUser } = useSelector((state) => state.user);
  let { productsTotalPrice, shippingPrice, orderTotal } = useSelector((state) => state.cart);
  const [customerData, setCustomerData] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [discountTotal, setDiscountTotal] = useState(orderTotal)
  const dispatch = useDispatch()
  const [qty , setQty] = useState(0) //will help to rerender the cart component only
  

  const handleChange = (e) => {
    setCustomerData({ ...customerData, [e.target.id]: e.target.value });
  };

  const handleIncQty = (product)=>{
    dispatch(addToCart({quantity: 1 , product }))
    setQty(qty +1)
  }
  const handleDecQty = (product)=>{
    dispatch(addToCart({quantity: -1 , product}))
    setQty(qty -1)
  }

  const handleDeleteProduct = (product)=>{
    dispatch(removeFromCart(product))
    setQty(qty -1)
  }



  const handlePointsDiscount = ()=>{
    try {
        Swal.fire({
            title: "Do you want to use collected points?",
            text: "You won't be able to revert this!",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#0A7273",
            cancelButtonColor: "#d33",
            confirmButtonText: "Use points!"
          }).then((result) => {
            if (result.isConfirmed) {
              const res = axios.put(`http://localhost:8000/api/user/pointsdiscount/${currentUser._id}`, {},{withCredentials: true})
              setDiscountTotal(prev => prev-1);
              console.log(discountTotal)
              Swal.fire({
                title: "Discount applied!",
                icon: "success"
              });
            }
          });
    } catch (error) {
      console.log(error)
    }
  }


  let orderData = {customerData , cartItems, orderTotal,productsTotalPrice ,shippingPrice, discountTotal}

  const handlePlaceOrder = ()=>{
     try {
       Swal.fire({
            title: "Place Order?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#0A7273",
            cancelButtonColor: "#d33",
            confirmButtonText: "Place it!"
          }).then((result) => {
            if (result.isConfirmed) {
              const res = axios.post("http://localhost:8000/api/order/placeorder", orderData)
              console.log("order placed")
              localStorage.removeItem('cart')
              setQty(qty -1)
              Swal.fire({
                title: "Placed!",
                text: "Your order has been placed.",
                icon: "success"
              });
            }
          });
     } catch (error) {
       console.log(error)
     }
  }


  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    if(cart){
      console.log(cart.cartItems);
      setCartItems(cart.cartItems);
    }
  }, [qty]);

  return (
    <section>
      <h3 className="text-2xl text-color3 font-bold mt-3 text-center">
        Shopping Cart
      </h3>
      <h3 className="text-xl text-color3 text-center mt-2">
        Order Information
      </h3>
      {/* user information */}
      <div className="ss:flex mt-[32px]">
        <form className="flex flex-col ml-[7%] mr-[2%] mb-[24px] ss:w-[50%] font-semibold  ss:border-r-2 border-b-2 ss:border-b-0 border-color1 ">
          <label className="ml-[2%] text-1xl mt-[8px] text-color3">
            Email:
          </label>
          <input
            defaultValue={currentUser ? currentUser.email : ""}
            id="email"
            type="email"
            className="w-[92%] ml-[4%] rounded-md p-1 mt-[8px] lg:w-[80%]"
            onChange={handleChange}
          />
          <label className="ml-[2%] text-1xl mt-[8px] text-color3">
            Address:
          </label>
          <input
            defaultValue={currentUser ? currentUser.address : ""}
            id="address"
            type="text"
            className="w-[92%] ml-[4%] rounded-md p-1 mt-[8px] lg:w-[80%]"
            onChange={handleChange}
          />
          <label className="ml-[2%] text-1xl mt-[8px] text-color3">
            Phone Number:
          </label>
          <input
            defaultValue={currentUser ? currentUser.phoneNumber : 0}
            id="phoneNumber"
            type="number"
            className="w-[92%] ml-[4%] rounded-md p-1 mt-[8px] lg:w-[80%] "
            onChange={handleChange}
          />
          {currentUser && 
            <div>
              <p className="ml-[2%] text-xl mt-[15px] text-color3">Use your collected points for discount</p>
              <p className="ml-[3%] text-lg mt-[5px] text-color3">You have {currentUser && currentUser.points } points</p>
              <button type="button" disabled={currentUser.points == 0}
               className="w-[30%] sm:w-[25%] rounded-md p-1 text-lg font-semibold bg-color3 text-color2 mb-2 mt-3 ml-[3%] hover:scale-110 hover:transition-all cursor-pointer"
              onClick={handlePointsDiscount}>5 points = 1$</button>
            </div>
          }

        </form>

        {/* cart products */}
        <div>
          <h3 className="text-1xl text-color3 mt-2 ml-[7%]">
            Products in cart:
          </h3>
          {cartItems &&cartItems.length>0
            ? cartItems.map((item) => {
              
                return (
                  <div className="xs:flex gap-10 mt-5 ml-14 ss:ml-0" key={item.product._id}>
                    <img
                      src={item.product.productImages[0]}
                      alt=""
                      className="w-[88px]"
                    />
                    <div>
                      <p className="text-lg font-semibold text-color3">
                        Price: {item.product.productPrice}$
                      </p>

                      <p className="text-color4 text-lg ">
                        New price: {item.product.productPrice * (1 - item.product.discountPercent / 100)}$
                      </p>
                      
                      <div className="flex">
                      <p className="mr-1 text-lg text-color3">Quantity:</p>
                        <button className="" onClick={()=>handleDecQty(item.product)}><FaCircleMinus className="text-color3 text-lg"/></button>
                        <p className="m-1 text-lg">{item.quantity}</p>
                        <button onClick={()=>handleIncQty(item.product)}><FaCirclePlus className="text-color3 text-lg"/></button>
                      </div>
                      <p className="text-lg text-color3">Total: {(item.product.offer? item.product.productPrice * (1 - item.product.discountPercent / 100) : item.product.productPrice) * item.quantity}$</p>
                    </div>
                    <button className="text-red-700 ml-[10px]" onClick={()=>handleDeleteProduct(item.product)}>Remove</button>
                  </div>
                  
                );
              })
            : <p className="text-xl text-color3">Your cart is empty</p>}
        </div>
      </div>

      {/* Order summary */}
      <div className="ml-[7%] mt-[68px] text-color1">
        <h3 className="text-1xl text-color3 mt-2 font-bold">Order Summary:</h3>
        <div className="ml-[10%]">
          <p className="text-xl font-semibold mb-1">Items Price: {productsTotalPrice}$ </p>
          <p className="text-xl font-semibold mb-1">Shipping Price: {shippingPrice} </p>
          <p className="text-xl font-semibold mb-1">Total: {orderTotal}  </p>

          {discountTotal<orderTotal && <p className="text-xl font-semibold mb-1">Total after discount: {discountTotal}  </p>}
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="w-[30%] sm:w-[15%] rounded-md p-1 text-lg font-semibold bg-color3 text-color2 mt-3 hover:scale-110 hover:transition-all"
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
      </div>
    </section>
  );
}

export default Cart;
