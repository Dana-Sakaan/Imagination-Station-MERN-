import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { FaHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

function ProductDetails() {
  SwiperCore.use([Navigation]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [product, setproduct] = useState(null);
  const params = useParams();
  const dispatch = useDispatch()
  const {currentUser} = useSelector((state) => state.user);



  const getProduct = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://imagination-station-be.onrender.com/api/product/products/${params.productId}`
      );
      setproduct(res.data.product);
      setLoading(false);
      console.log(res.data.product);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    getProduct();
  }, [params.productId]);

  const addToCartHandler = ()=>{
    dispatch(addToCart({quantity: 1, product}))
    console.log("here")
  }

  return (
    <section>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-700">{error}</p>}

      {!loading && !error && product ? (
        <div className=" mt-[7%] ml-[5%] sm:flex sm:justify-around">
          <div className="sm:w-[50%]">
            <Swiper navigation>
              {product.productImages.map((url) => (
                <SwiperSlide key={url}>
                  <div>
                    <img
                      src={url}
                      alt="product image"
                      className="w-[90%] ml-auto mr-auto"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="sm:w-[50%] sm:ml-[5%] text-1xl mt-7">
            {product.offer && (
              <p className="text-color4 text-2xl">
                {product.discountPercent}% off
              </p>
            )}
            <h1 className="text-2xl">
              <span className="text-color3 mr-2">Name:</span>{" "}
              {product.productName}
            </h1>
            <h2 >
              <span className="text-color3 text-1xl mr-2">price:</span>
              <span className={product.offer? "line-through": ""}>{product.productPrice}$</span>
              {product.offer ? (
                <span className="text-color4 text-1xl ml-2">
                  {product.productPrice * (1 - product.discountPercent / 100)}$
                </span>
              ) : (
                " "
              )}
            </h2>
            <p className="">
              <span className="text-color3  text-1xl mr-2">Category:</span>{" "}
              {product.category}
            </p>
            <p className="">
              <span className="text-color3 text-1xl mr-2">Age:</span>{" "}
              {product.age}
            </p>
            <p className="">
              <span className="text-color3 text-1xl mr-2">Brand:</span>
              {product.brand}
            </p>
            <button
              className="mt-2 mb-2 bg-color3 p-2 text-color2 rounded-lg transition-all duration-300 hover:scale-105"
              disabled={(product.quantityInStock == 0)}
              onClick={addToCartHandler}
            >
              {(product.quantityInStock == 0 ? "Out Of Stock" : "Add To Cart")}
            </button>

            <button className="mt-2 mb-2 ml-4 bg-color1 p-2 text-color2 rounded-lg transition-all duration-300 hover:scale-105">
              <FaHeart />
            </button>

            {currentUser && currentUser.role == "admin" && (
              <div className="flex ">
                <Link to={`/update-product/${product._id}`}>
                <button className="mt-2 mb-2  bg-color3 p-2 text-color2 rounded-lg"
                >Edit Product</button>
                </Link>
                
              </div>
            )}



            <p className="text-gray-700">
              <span className="block text-color3 mr-2">Description:</span>
              {product.productDescription}
            </p>
          </div>
        </div>
      ) : (
        ""
      )}

    </section>
  );
}

export default ProductDetails;
