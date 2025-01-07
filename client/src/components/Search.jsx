import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { HiArrowSmallLeft,HiArrowSmallRight  } from "react-icons/hi2";


function Search() { 
  const [searchedProducts, setSearchedProducts] = useState([])
  const [categoryValues , setCategoryValues] = useState([])
  const [brandValues , setbrandValues] = useState([])
  const [ageValues , setageValues] = useState([])
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [pagination, setPagination] = useState(1)
  const [pagesNumber, setPagesNumber]= useState() //number of pages returned from database
  const [searchData, setSearchData] = useState({
    searchTerm: "",
    category: "",
    age: "",
    brand: "",
    offer: false,
    page: 1,
    sortBy: "asc",
  });



  const searchParams = new URLSearchParams(searchData).toString()
  
  const getProducts = async ()=>{
    try {
      setLoading(true)
      const res = await axios.get(`http://localhost:8000/api/product/getproducts?${searchParams}`)
      setSearchedProducts(res.data.searchedProducts)
      setCategoryValues(res.data.categoryValues)
      setbrandValues(res.data.brandValues)
      setageValues(res.data.ageValues)
      setPagesNumber(res.data.pages)
      setLoading(false)
    } catch (error) {
      setError(error)
      console.log(error)
    }
  }



  const handleChange = (e) => {
    if (e.target.type == "checkbox") {
      setSearchData({ ...searchData, offer: e.target.checked });
    } else setSearchData({ ...searchData, [e.target.id]: e.target.value });
  };



  useEffect(()=>{
    getProducts()
  },[searchData.page])




  const formSubmitButton = (e)=>{
    e.preventDefault()
    setSearchData({...searchData ,page: searchData.page = 1 })
    getProducts()
  }



  const increasePage = ()=>{
     setSearchData({...searchData, page: searchData.page + 1})
    console.log(searchData)
  }

  const decreasePage =  ()=>{
    setSearchData({...searchData, page: searchData.page - 1})
    console.log(searchData)
  }


  return (
    <section className="">
      <div className=" border-b-2 border-b-primary">
        <h2 className="mt-[32px] ml-[7%] text-1xl text-primary font-semibold md:ml-[5%]">
          Search for products
        </h2>

        <form
          className="flex flex-wrap gap-3 mt-[18px] ml-[10%]
         mb-[24px] md:ml-[7%]"
          onSubmit={formSubmitButton}
        >
          <input
            onChange={handleChange}
            value={searchData.searchTerm}
            type="text"
            id="searchTerm"
            placeholder="Search..."
            className="p-2 text-lg rounded-lg w-[200px]"
          />

          <select
            onChange={handleChange}
            value={searchData.category}
            name="category"
            id="category"
            className=" p-2 capitalize text-lg bg-primary rounded-lg w-[150px] text-text4"
          >
            <option value="" disabled selected hidden>
              Category
            </option>
            {categoryValues &&
              categoryValues.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
          </select>

          <select
            onChange={handleChange}
            value={searchData.brand}
            name="brand"
            id="brand"
            className=" p-2  capitalize text-lg bg-primary rounded-lg w-[150px]  text-text4"
          >
            <option value="" disabled selected hidden>
              brand
            </option>
            {brandValues &&
              brandValues.map((brand) => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
          </select>

          <select
            onChange={handleChange}
            value={searchData.age}
            name="age"
            id="age"
            className=" p-2  capitalize text-lg bg-primary rounded-lg w-[150px]  text-text4"
          >
            <option value="" disabled selected hidden>
              age
            </option>
            {ageValues &&
              ageValues.map((age) => <option key={age} value={age}>{age}</option>)}
          </select>
          <label className="text-xl text-primary">
            Offer:{" "}
            <input
              type="checkbox"
              name="offer"
              id="offer"
              onChange={handleChange}
              value={searchData.offer}
            />
          </label>
          <select
            onChange={handleChange}
            value={searchData.sortBy}
            name="sortBy"
            id="sortBy"
            className=" p-2 capitalize text-lg bg-primary rounded-lg  w-[150px]  text-text4"
          >
            <option value="" disabled selected hidden>
              Sort:
            </option>
            <option value="desc">price: high to low</option>
            <option value="asc">price: low to high</option>
          </select>

          <button className="p-2 text-lg bg-secondary rounded-lg w-[150px]">
            Search
          </button>
        </form>
      </div>

      <div className="flex items-center justify-center mt-4 text-3xl">
        <button
          type="button"
          disabled={searchData.page == 1}
          className="text-primary"
          onClick={decreasePage}
        >
          <HiArrowSmallLeft />
        </button>
        <p className="ml-3 mr-3 text-2xl">{searchData.page}</p>
        <button
          type="button"
          disabled={searchData.page == pagesNumber}
          className="text-primary"
          onClick={increasePage}
        >
          <HiArrowSmallRight />
        </button>
      </div>

      <div className="mt-[24px] flex">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-700">{error}</p>}

       {/* {!loading && !error && 
        <div className="flex flex-wrap">
          {searchedProducts.length == 0
            ? (products.map((product) => (
                <div key={product._id} className="w-[90%] ml-[5%] ss:w-[45%] md:w-[30%] ss:ml-[3%]">
                  <ProductCard  product={product} />
                </div>
              )))
            : (searchedProducts.map((product) => (
                <div key={product._id} className="w-[90%] ml-[5%] ss:w-[45%] md:w-[30%] ss:ml-[3%]">
                  <ProductCard  product={product} />
                </div>
              )))
          }
        </div>
        } */}

      {!loading && !error && 
        <div className="flex flex-wrap">
          {searchedProducts.length != 0
            ?(searchedProducts.map((product) => (
                <div key={product._id} className="w-[90%] ml-[5%] ss:w-[45%] md:w-[30%] ss:ml-[3%]">
                  <ProductCard  product={product} />
                </div>
              ))): "Loading..."
          }
        </div>
        }
      </div>

      <div className="flex items-center justify-center mt-4 text-3xl">
        <button
          type="button"
          disabled={searchData.page == 1}
          className="text-primary"
          onClick={decreasePage}
        >
          <HiArrowSmallLeft />
        </button>
        <p className="ml-3 mr-3 text-2xl">{searchData.page}</p>
        <button
          type="button"
          disabled={searchData.page == pagesNumber}
          className="text-primary"
          onClick={increasePage}
        >
          <HiArrowSmallRight />
        </button>
      </div>
    </section>
  );
}

export default Search;
