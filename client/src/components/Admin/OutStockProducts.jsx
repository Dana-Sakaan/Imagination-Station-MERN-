import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../ProductCard";

function OutStockProducts() {
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
         setLoading(true)
        const res = await axios.get("http://localhost:8000/api/product/out-of-stock", {withCredentials:true});
        console.log(res.data.outStock)
        setProducts(res.data.outStock);
        setLoading(false)
      } catch (error) {
        setError(error.message);
        console.log(error);
      }
    };
    getProducts();
  }, []);


  return (
    <section>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-700">{error}</p>}

      <div className="flex flex-wrap">
        {products &&
          !error &&
          !loading &&
          products.map((product) => (
            <div className="w-[90%] ml-[5%] ss:w-[45%] md:w-[30%] ss:ml-[3%]">
              <ProductCard key={product._id} product={product} />
            </div>
          ))}
      </div>
    </section>
  );
}

export default OutStockProducts;
