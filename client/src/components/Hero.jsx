import { Link } from "react-router-dom";
import homeImg from "../images/homeImg.jpeg";

function Hero() {
  return (
    <section 
      className=" mt-[50px] bg-cover bg-center brightness-50"
      style={{ backgroundImage: `url(${homeImg})` }}
    >
      <div className="flex flex-col items-center">
        <div className=" m-[90px] backdrop-contrast-100 backdrop-brightness-50 text-center p-[10px] w-[75%] text-text4 sm:w-[50%]">
          <p className="italic text-2xl">"Toys are children's words."</p>
          <h1 className="text-3xl font-semibold ss:text-4xl">
            Imagination <span className="text-secondary">Station.</span>
          </h1>
          <p className="ml-2 text-text3 text-lg ss:text-1xl">
            Discover the world of joy at our charming toy shop!
          </p>

          <Link to='/search'>
          <button className="text-lg mt-2 text-white gradient pr-4 pl-4 pt-2 pb-2  rounded-lg text-center ">
            Shop Now
          </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
