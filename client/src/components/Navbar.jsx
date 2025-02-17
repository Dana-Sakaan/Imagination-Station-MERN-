import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../images/logo.jpeg";
import {
  FaShoppingCart,
  FaUser,
  FaHeart,
  FaSearch,
  FaBars,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  let cartLength = useSelector((state) => state.cart.cartItems.length);

  const toggleNav = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/products?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get("SearchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <div>
      <nav className="bg-color1 text-color2 w-[100%]">
        {/* top navbar */}
        <div className="flex justify-between p-4 xs:p-8 xs:pb-3 xs:pt-5 ss:justify-around">
          <div>
            <Link to="/" className="flex">
              <img className="w-11 xs:w-14" src={logo} alt="" />
              <p className="text-color2 mt-3 ml-2 text-lg">
                Imagination Station
              </p>
            </Link>
          </div>
          <form
            onSubmit={handleSubmit}
            className="hidden ss:flex ss:justify-center ss:w-[50%] ss:gap-1"
          >
            <input
              className=" w-[70%] text-black rounded-lg p-1"
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
            <button className="text-xl">
              <FaSearch />
            </button>
          </form>
          <div className=" flex items-center gap-3 text-xl pt-2 xs:pt-3 xs:text-1xl xs:gap-5 md:text-2xl">
            <div class="flex items-center">
              <span class="text-sm text-color4 ">{cartLength}</span>
              <Link to="/cart">
                <FaShoppingCart className="hover:text-color4" />
              </Link>
            </div>
            <Link to="/wishlist">
              <FaHeart className="hover:text-color4" />
            </Link>
            <Link to="/profile">
              <FaUser className="hover:text-color4" />
            </Link>
            <button onClick={toggleNav} className="xs:hidden">
              <FaBars className="hover:text-color4 text-xl" />
            </button>
            {/*mobile button*/}
          </div>
        </div>
        {/*mobile nav */}
        <div
          className={`${
            isOpen
              ? "flex flex-col flex-wrap text-1xl text-center xs:hidden"
              : "hidden xs:hidden"
          }`}
        >
          <Link to="/" className="block hover:text-color4">
            Home
          </Link>
          <Link to="/products" className="block hover:text-color4">
            Products
          </Link>
          <Link to="/about" className="block hover:text-color4">
            About Us
          </Link>

          <Link to="/signup" className="block hover:text-color4">
            Create Account
          </Link>
        </div>
        {/*mobile nav*/}
        <hr />
        {/* Buttom navbar (large screens) */}
        <div className="hidden xs:flex xs:justify-around xs:gap-3 xs:p-6 xs:pt-0 xs:pb-2 xs:text-xl ss:text-1xl">
          <Link to="/" className="hover:text-color4">
            Home
          </Link>
          <Link to="/products" className="hover:text-color4">
            Products
          </Link>
          <Link to="/about" className="hover:text-color4">
            About Us
          </Link>

          <Link to="/signup" className="hover:text-color4">
            Create Account
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
