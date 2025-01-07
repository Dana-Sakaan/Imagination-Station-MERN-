import { Link } from "react-router-dom";
import homeImg from "../images/toysShop.jpeg";

function Hero() {
  return (
    <section 
      className="mt-[50px]">
      <div className="sm:flex sm:justify-around">

        <div className="text-center text-color3 ss:mt-[10%]">
          <p className="italic text-2xl text-color4">"Toys are children's words."</p>
          <h1 className="text-3xl font-semibold ss:text-4xl">
            Imagination <span className="text-color4">Station.</span>
          </h1>
          <p className="ml-2 text-lg ss:text-1xl">
            Discover the world of joy at our charming toy shop!
          </p>

          <Link to='/search'>
          <button className=" mb-2 text-lg bg-color4 mt-2 text-color3 pr-4 pl-4 pt-2 pb-2  rounded-lg text-center ">
            Shop Now
          </button>
          </Link>
        </div>
        <div className="w-[100%]  sm:w-[50%] sm:h-[500px]">
          <img src={homeImg} alt="image" className="sm:w-[100%] sm:h-[100%]" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
