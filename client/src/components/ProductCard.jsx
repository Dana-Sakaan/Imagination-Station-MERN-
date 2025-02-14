import { FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToWishlist } from "../redux/wishlistSlice";
;

function ProductCard({ product }) {

  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch()

  const addToWishList = (item)=>{
    if(!currentUser){
      navigate("/signup")
    }else{
        dispatch(addToWishlist(item))
    }
  }

  return (
    <div className="h-96 rounded-md ml-[5%] w-[90%] bg-gray-100 ss:ml-[3%] md:ml-[2%] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] mb-3">
      <button type="button" onClick={()=>{addToWishList(product)}}>
        <FaHeart className="text-color1 text-2xl ml-5 mt-2 hover:scale-110 cursor-pointer" />
      </button>
      <Link to={`/product-details/${product._id}`}>
        <div className="flex justify-center">
          <img src={product.productImages[0]} alt="" className="w-[80%] mt-2" />
        </div>

        <div className="text-center text-1xl text-color3">
          <h3 className="">{product.productName}</h3>
          <p className="">
            {product.productPrice}${" "}
            {product.offer && (
              <p className="text-color4 text-1xl">
                {product.discountPercent}% off
              </p>
            )}
          </p>
        </div>
      </Link>
      <div className="flex flex-col items-center">
        <button
          className="bg-color1 text-color2 mb-2 p-1 text-1xl rounded-md "
          disabled={(product.quantityInStock == 0)}
        >
          {(product.quantityInStock == 0 ? "Out Of Stock" : "Add To Cart")}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
