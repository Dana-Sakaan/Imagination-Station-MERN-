import { FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToWishlist } from "../redux/wishlistSlice";
import { addToCart } from "../redux/cartSlice";
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

   const addToCartHandler = ()=>{
      dispatch(addToCart({quantity: 1, product}))
      console.log("here")
    }
  

  return (
    <div className="rounded-md ml-[5%] w-[90%] bg-gray-100 ss:ml-[3%] md:ml-[2%] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] mb-3 flex flex-col min-h-[420px]">
  {/* Heart button remains unchanged */}
  <button type="button" onClick={() => {addToWishList(product)}}>
    <FaHeart className="text-color1 text-2xl ml-5 mt-2 hover:scale-110 cursor-pointer" />
  </button>

  <Link to={`/product-details/${product._id}`} className="flex flex-col flex-grow">
    {/* Image container with fixed height */}
    <div className="flex justify-center h-48 px-2 mt-2">
      <img 
        src={product.productImages[0]} 
        alt="" 
        className="w-full h-full object-contain max-h-full" 
      />
    </div>

    {/* Text content with constrained height */}
    <div className="text-center text-1xl text-color3 flex flex-col flex-grow px-2 mt-4">
      <h3 className="line-clamp-2 mb-2 font-medium">
        {product.productName}
      </h3>
      <div className="mt-auto">
        <p className="font-semibold">
          {product.productPrice}$
          {product.offer && (
            <span className="text-color4 text-1xl block">
              {product.discountPercent}% off
            </span>
          )}
        </p>
      </div>
    </div>
  </Link>

  {/* Add to cart button remains at bottom */}
  <div className="flex flex-col items-center mt-auto">
    <button
      className="bg-color1 text-color2 mb-2 p-1 text-1xl rounded-md w-[90%]"
      disabled={product.quantityInStock === 0}
      onClick={addToCartHandler}
    >
      {product.quantityInStock === 0 ? "Out Of Stock" : "Add To Cart"}
    </button>
  </div>
</div>
  );
}

export default ProductCard;
