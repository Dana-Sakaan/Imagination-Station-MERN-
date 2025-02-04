import axios from "axios";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sortingOrders, setSortingOrders] = useState({
    statusSort: "Incompleted",
    dateSort: "latest",
    page: 1,
  });

  const filteringData = new URLSearchParams(sortingOrders).toString();

  const getOrders = async (e) => {
    // e.preventDefault()
    try {
      setLoading(true);
      const res = await axios.get(
        `https://imagination-station-be.onrender.com/api/order/getorders?${filteringData}`,
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      setOrders(res.data.orders);
      console.log(orders);
    } catch (error) {
      setError(error.response.data.message);
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, [sortingOrders]);

  console.log(sortingOrders);
  const handleSortChange = (e) => {
    setSortingOrders({ ...sortingOrders, [e.target.id]: e.target.value });
    console.log(sortingOrders);
  };

  // const handleSortSubmit = async (e)=>{
  //    e.preventDefault()
  //    try {
  //      const res = await axios.get(`https://imagination-station-be.onrender.com/api/order/sortorders?${sortingOrders}`)
  //    } catch (error) {

  //    }
  // }

  const ChangeOrdersPage = () => {
    setSortingOrders({ ...sortingOrders, page: sortingOrders.page + 1 });
  };

  return (
    <section>
      <form className="ml-[7%] mb-[3%] mt-[3%]" onSubmit={getOrders}>
        <h3 className="text-1xl text-color3 font-bold mb-5 ">Sort Orders:</h3>
        <select
          onChange={handleSortChange}
          id="statusSort"
          className=" p-2 capitalize text-lg bg-color1 rounded-lg  w-[150px] mr-3 text-color2"
        >
          <option value="" disabled selected hidden>
            Sort Orders:
          </option>
          <option value="Incompleted">Incompleted Orders</option>
          <option value="Completed">Completed Orders</option>
          <option value="Canceled">Canceled Orders</option>
        </select>

        <select
          onChange={handleSortChange}
          id="dateSort"
          className=" p-2 capitalize text-lg bg-color1 rounded-lg  w-[150px] mr-3 text-color2"
        >
          <option value="" disabled selected hidden>
            Sort Dates:
          </option>
          <option value="oldest">Oldest</option>
          <option value="latest">Latest</option>
        </select>
      </form>

      {loading ? <p className="text-xl">Loading...</p> : ""}
      <div className=" ml-[15%] ">
        <table className="text-color2">
          <thead className="bg-color1">
            <tr>
              <th scope="col" className="px-6 py-3 border-r-2 border-color2">
                Product ID
              </th>
              <th scope="col" className="px-6 py-3 border-r-2 border-color2">
                Customer
              </th>
              <th scope="col" className="px-6 py-3 border-r-2 border-color2">
                Is Paid
              </th>
              <th scope="col" className="px-6 py-3 border-r-2 border-color2">
                Is Delivered
              </th>
              <th scope="col" className="px-6 py-3 border-r-2 border-color2">
                Order Status
              </th>
              <th scope="col" className="px-6 py-3 border-r-2 border-color2">
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {/* create one tr with the map function */}
            {!error && orders
              ? orders.map((order) => (
                  <tr className="bg-color3">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium"
                    >
                      #{order._id}
                    </th>
                    <td className="px-6 py-4">{order.email}</td>
                    <td className="px-6 py-4">
                      {order.isPaid == false ? "False" : "True"}
                    </td>
                    <td className="px-6 py-4">
                      {order.isDelivered == false ? "False" : "True"}
                    </td>
                    <td className={order.orderStatus== "Incompleted"? "text-color4 px-6 py-4": "px-6 py-4"}>{order.orderStatus}</td>
                    <td className="px-6 py-4 ">
                      <Link to={`/getOrder/${order._id}`}>
                        <FaEye />
                      </Link>
                    </td>
                  </tr>
                ))
              : ""}
          </tbody>
        </table>
        <button type="button" className="text-center text-color3 text-xl mt-3" onClick={ChangeOrdersPage}>
          Show more
        </button>
      </div>
    </section>
  );
}

export default Orders;
