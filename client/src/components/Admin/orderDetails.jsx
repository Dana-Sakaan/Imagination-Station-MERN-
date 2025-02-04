import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2'

function OrderDetails() {
  const [order, setOrder] = useState();
  const [error,setError] = useState()
  const params = useParams();
  const [orderStatus, setOrderStatus] = useState({
    paymentStatus: null,
    deliveryStatus: null,
    completionStatus: ""
  });
  const navigate = useNavigate()

  const getOrder = async () => {
    try {
      const id = params.id;
      const res = await axios.get(
        `https://imagination-station-be.onrender.com/api/order/getorder/${id}`,
        { withCredentials: true }
      );
      setOrder(res.data.order);
      console.log(res.data.order);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(orderStatus);
  const handlePaymentStatus = (e) => {
    setOrderStatus({ ...orderStatus, paymentStatus: e.target.value });
    console.log(orderStatus);
  };

  const handleDeliveryStatus = (e) => {
    setOrderStatus({ ...orderStatus, deliveryStatus: e.target.value });
    console.log(orderStatus);
  };

  const handleStatusSubmit = async (e) => {
    e.preventDefault();
    setOrderStatus({...orderStatus, completionStatus: "Completed"})
    try {
         Swal.fire({
            title: "Is the order completed?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
              const res =  axios.put(`https://imagination-station-be.onrender.com/api/order/updateorder/${order._id}`, orderStatus,{withCredentials: true})
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
              navigate("/dashboard/orders")
            }
          });
    } catch (error) {
      console.log(error)
      setError(error)
    }
  };


  const cancelOrder = async ()=>{
    
    try {
        Swal.fire({
            title: "Are you sure you want to cancel order?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Cancel Order"
          }).then((result) => {
            if (result.isConfirmed) {
                const res = axios.put(`https://imagination-station-be.onrender.com/api/order/cancelorder/${order._id}`, {status:"Canceled"} , {withCredentials: true})
              Swal.fire({
                title: "Order Canceled!",
                text: "Your file has been deleted.",
                icon: "success"
              });
              navigate('/dashboard/orders')
            }
          });
    
    } catch (error) {
      setError(error)
      console.log(error)
    }
  }

  useEffect(() => {
    getOrder();
  }, [params.id]);

  return (
    <section className="m-[5%]">
      <div>
        {/*products data*/}
        <div className="bg-color1 w-[70%] ml-[10%] rounded-md">
          <h2 className="text-color2 text-xl ml-5">Order Id: #{params.id}</h2>
          {order
            ? order.cartItems.map((item) => (
                <div className="flex w-[90%] mt-[2%] ml-[5%] justify-between border-2 border-color2 rounded-md">
                  <div className="flex p-3">
                    <img
                      src={item.product.productImages[0]}
                      alt=""
                      className="w-[60px] h-[60px] mr-4 "
                    />
                    <p className="pt-4 text-lg text-color2">
                      {item.product.productName}
                    </p>
                  </div>
                  <div className="p-3 text-lg">
                    {item.product.offer && (
                      <p className="text-color4 text-lg">
                        {item.product.discountPercent}%
                      </p>
                    )}
                    {item.product.offer ? (
                      <p className=" text-color2">
                        $
                        {item.product.productPrice *
                          (1 - item.product.discountPercent / 100) *
                          item.quantity}
                      </p>
                    ) : (
                      <p className=" text-color2">
                        ${item.product.productPrice * item.quantity}
                      </p>
                    )}

                    <p className="text-color2">Qty: {item.quantity}</p>
                  </div>
                </div>
              ))
            : ""}

          {order && (
            <div className="ml-[10%] mt-[5%]">
              <h3 className="mb-2 text-xl text-color2">Order Summary</h3>
              <p className="mb-1 ml-3 text-lg text-color2">
                Subtotal: {order.productsTotal}$
              </p>
              <p className="mb-1 ml-3 text-lg text-color2">
                Shipping: {order.shippingTotal}$
              </p>
              <p className="mb-1 ml-3 text-lg font-bold text-color2">
                Total: {order.orderTotal}$
              </p>
              {order.discountTotal < order.orderTotal && (<p className="mb-1 ml-3 text-lg font-bold text-color4">
                Total after discount: {order.discountTotal}$
              </p>)}
            </div>
          )}
        </div>

        {/* customer data */}
        {order && (
          <div className="bg-color1 w-[70%] ml-[10%] mt-[3%] rounded-md">
            <h3 className="ml-[2%] mb-2 text-xl text-color2">
              Customer Details
            </h3>
            <p className="text-color2 ml-[5%] text-xl mb-2">
              Email:
              <span className="text-lg ml-2">{order.email}</span>
            </p>
            <p className="text-color2 ml-[5%] text-xl mb-2">
              Address:
              <span className="text-lg ml-2">{order.address}</span>
            </p>
            <p className="text-color2 ml-[5%] text-xl mb-2">
              Phone:{" "}
              <span className="text-lg ml-2">
                {order.phoneNumber}
              </span>
            </p>
            <p className="text-color2 ml-[5%] text-xl mb-2">
              Paid:
              <span className="ml-2">
                {order.isPaid ? (
                  <span className=" text-lg bg-color4 p-1 rounded-md">
                    Paid
                  </span>
                ) : (
                  <span className="text-lg  bg-red-600 p-1 rounded-md">
                    Not Paid
                  </span>
                )}
              </span>
            </p>
            <p className="text-color2 ml-[5%] text-xl mb-2">
              Delivered:
              <span className="ml-2">
                {order.isDelivered ? (
                  <span className="text-lg bg-color4 p-1 rounded-md">
                    {" "}
                    Delivered
                  </span>
                ) : (
                  <span className="text-lg bg-red-600 p-1 rounded-md">
                    {" "}
                    Not Delivered
                  </span>
                )}
              </span>
            </p>
            <p className="text-color2 ml-[5%] text-xl mb-2">
              Ordered At:{" "}
              <span className="text-lg ml-2">{order.createdAt}</span>
            </p>
          </div>
        )}
      </div>

      {/*order status*/}
      <form className="bg-color1 w-[70%] ml-[10%] mt-[3%] rounded-md" onSubmit={handleStatusSubmit}>
        <h3 className="ml-[2%] mb-2 text-xl text-color2">Order Status</h3>
        <div>
          <p className="text-color2 ml-[5%] text-xl mb-2">Payment Status:</p>
          <div className="ml-[7%]">
            <input
              type="radio"
              name="payment"
              value={true}
              checked={orderStatus.paymentStatus == "true"}
              onClick={handlePaymentStatus}
            />
            <label className={orderStatus.paymentStatus == "true"?"ml-1 text-xl text-color4": "ml-1 text-xl text-color2"}>Paid</label>
            <br />
            <input
              type="radio"
              name="payment"
              value={false}
              checked={orderStatus.paymentStatus == "false" || null}
              onClick={handlePaymentStatus}
            />
            <label className={orderStatus.paymentStatus == "false"?"ml-1 text-xl text-color4": "ml-1 text-xl text-color2"}>Not Paid</label>
          </div>
        </div>

        <div>
          <p className="text-color2 ml-[5%] text-xl mb-2">Delivery Status:</p>
          <div className="ml-[7%]">
            <input
              type="radio"
              name="delivery"
              value={true}
              checked={orderStatus.deliveryStatus == "true"}
              onChange={handleDeliveryStatus}
            />
            <label className={orderStatus.deliveryStatus == "true"?"ml-1 text-xl text-color4": "ml-1 text-xl text-color2"}>Delivered</label>
            <br />
            <input
              type="radio"
              name="delivery"
              value={false}
              checked={orderStatus.deliveryStatus == "false" || null}
              onChange={handleDeliveryStatus}
            />
            <label className={orderStatus.deliveryStatus == "false"?"ml-1 text-xl text-color4": "ml-1 text-xl text-color2"}>Not Delivered</label>
          </div>
        </div>
        <button type="button" className="bg-red-600 text-color2 text-lg p-1 rounded-md block ml-[5%] mt-4" onClick={cancelOrder}>
          Cancel Order
        </button>
        <button type='submit' className="bg-color3 text-color2 text-lg p-1 rounded-md ml-[5%] mt-4 mb-2">
          Complete Order
        </button>
      </form>
    </section>
  );
}

export default OrderDetails;
