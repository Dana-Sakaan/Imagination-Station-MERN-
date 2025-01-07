import { Link, NavLink } from "react-router-dom";
import logo from "../images/logo.jpeg";
import { FaShoppingCart, FaUser, FaHeart, FaSearch } from "react-icons/fa";
import { CiMenuBurger } from "react-icons/ci";

function Navbar() {
  return (
    <nav className="bg-color1 text-color2 w-[100%]">
      {/* top navbar */}
      <div className="flex justify-between p-4 xs:p-8 xs:pb-3 xs:pt-5 ss:justify-around">
        <div>
          <Link to="/" className="flex">
            <img className="w-11 xs:w-14" src={logo} alt="" />
            <p className="text-color2 mt-3 ml-2 text-lg">Imagination Station</p>
          </Link>
        </div>
        <div className="flex justify-center w-[50%] gap-1">
          <input
            className=" w-[70%] text-black rounded-lg p-1"
            type="text"
            placeholder="Search..."
          />
          <button className="text-xl">
            <FaSearch />
          </button>
        </div>
        <div className=" flex gap-3 text-xl pt-2 xs:pt-3 xs:text-1xl xs:gap-5 md:text-2xl">
          <button className="xs:hidden"><CiMenuBurger/></button> 
          <Link to="/cart">
            <FaShoppingCart className="hover:text-color4"/>
          </Link>
          <Link to="/wishlist">
            <FaHeart className="hover:text-color4"/>
          </Link>
          <Link to="/profile">
            <FaUser className="hover:text-color4"/>
          </Link>
        </div>
      </div>

      <hr />
      {/* Buttom navbar */}
      <div className="flex justify-around gap-3 p-6 pt-0 pb-2 text-xl ss:text-1xl">
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
  );
}

export default Navbar;
