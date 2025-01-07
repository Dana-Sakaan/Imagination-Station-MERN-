import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import ProductCard from "./ProductCard";
import axios from "axios";

function HomeProducts() {
  SwiperCore.use([Navigation]);
  const [productOffers, setProductOffers] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getOfferedProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:8000/api/product/offer");
        setProductOffers(res.data.offeredProducts);
        setLoading(false);
        console.log(res);
      } catch (error) {
        console.log(error);
        setError(error.response.message);
      }
    };
    getOfferedProducts();
  }, []);

  return (
    <section className="mt-10 ml-[3%] border-t-2 border-color1">
      <h2 className="text-2xl text-color3 font-semibold mb-8">
        Products on Sale:
      </h2>
      {loading && (
        <p
          className="text-lg
    "
        >
          Loading...
        </p>
      )}
      {error && <p className=" text-lg text-red-700">{error}</p>}

       <Swiper navigation slidesPerView={1} breakpoints={{620:{
        slidesPerView:2,
      },
      1060: {
        slidesPerView: 3,
        spaceBetween: 30
      },
      1700: {
        slidesPerView: 4,
        spaceBetween: 40
      }}}>
        <div>
          {productOffers &&
            productOffers.map((product) => (
              <SwiperSlide key={product._id} >
                  <ProductCard product={product} /></SwiperSlide>
            ))}
        </div>
        </Swiper>
    </section>
  );
}

export default HomeProducts;
