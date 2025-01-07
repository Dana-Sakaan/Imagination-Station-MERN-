import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

function UpdateProduct() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [product, setproduct] = useState(null);
  const [deleteButton, setDeleteButton]= useState(false)
  const params = useParams();
  const navigate = useNavigate()
  const [editedProduct, setEditedProduct] = useState({});

  const handleChange = (e) => {
    if (e.target.type == "checkbox") {
      setEditedProduct({ ...editedProduct, offer: e.target.checked });
    } else {
      setEditedProduct({ ...editedProduct, [e.target.id]: e.target.value });
    }
  };

  const deleteProductButton = ()=>{
    setDeleteButton(deleteButton ? false : true)
  }

  const handleDeleteProduct = ()=>{
    try {
         Swal.fire({
            title: "Are you sure you want to delete this product?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
              const res = axios.delete(`http://localhost:8000/api/product/deleteproduct/${product._id}` , {withCredentials: true})
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
              navigate("/")
            }
          });
    } catch (error) {
      setError(error.response.message)
    }
  }

  const getProduct = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:8000/api/product/products/${params.productId}`
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

  const handleSubmit =  () => {
    try {
         Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
      const res = axios.patch(
        `http://localhost:8000/api/product/updateproduct/${product._id}`,
        editedProduct,
        { withCredentials: true }
      );
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
        navigate(`/product-details/${product._id}`)
      }
    });
    } catch (error) {
      setError(error.response.message);
      console.log(error);
    }
  };

  return (
    <div className="ml-[5%] w-[90%] mt-[32px] mb-12">
      {loading && <p>Loading...</p>}
      <h2 className="text-primary text-2xl font-semibold">Update Product:</h2>
      {!loading && !error && product && (
        <form className=" flex" onSubmit={handleSubmit}>
          <div className="flex flex-col text-lg">
            <label htmlFor="" className="mb-1  mt-2  text-primary">
              Product Name:
            </label>
            <input
              defaultValue={product.productName}
              onChange={handleChange}
              type="text"
              id="productName"
              required
              className="rounded-md w-[100%] p-1"
            />

            <label htmlFor="" className="mb-1 mt-2  text-primary">
              Product Price:
            </label>
            <input
              defaultValue={product.productPrice}
              onChange={handleChange}
              type="number"
              id="productPrice"
              required
              className="rounded-md w-[100%] p-1"
            />

            <label className="mb-1  mt-2  text-primary">
              Quantity in stock:
            </label>
            <input
              defaultValue={product.quantityInStock}
              onChange={handleChange}
              type="number"
              id="quantityInStock"
              required
              className="rounded-md w-[100%]  p-1"
            />

            <label className="mb-1  mt-2  text-primary">Product brand:</label>
            <input
              defaultValue={product.brand}
              onChange={handleChange}
              type="text"
              id="brand"
              required
              className=" mb-1 mt-2 p-1 rounded-md w-[100%] "
            />

            <label className="mb-1  mt-2  text-primary">Category:</label>
            <input
              type="text"
              defaultValue={product.category}
              name="category"
              id="category"
              className="mb-1 mt-2 p-1 rounded-md w-[100%]"
              onChange={handleChange}
            />

            <label className="mb-1  mt-2  text-primary">Age:</label>
            <input
              type="text"
              defaultValue={product.age}
              name="age"
              id="age"
              className="mb-1 mt-2 p-1 rounded-md w-[100%]"
              onChange={handleChange}
            />

            <label className="mb-1 mt-2  text-primary">
              Offer:
              <input
                checked={product.offer}
                type="checkbox"
                id="offer"
                className="ml-2 "
                onChange={handleChange}
              />
            </label>

            <label className="mb-1  mt-2  text-primary">
              Discount Percent:
              <span className="text-text3">(if there is a discount)</span>
            </label>
            <input
              disabled={!product.offer}
              defaultValue={product.discountPercent}
              onChange={handleChange}
              type="number"
              id="discountPercent"
              className="rounded-md w-[100%] p-1"
            />

            <label className="mb-1  mt-2  text-primary">
              Product Description:
            </label>
            <textarea
              defaultValue={product.productDescription}
              onChange={handleChange}
              name=""
              id="productDescription"
              className="rounded-md w-[100%] p-1"
            ></textarea>

            <button
              type="submit"
              className="bg-primary mt-4 rounded-md text-text4 p-1"
              disabled={loading}
            >
              {loading ? "Loading..." : "Edit product"}
            </button>
            <button
            type="button"
              className="mt-2 mb-2 ml-4 bg-red-700 p-2 text-text4 rounded-lg"
              onClick={deleteProductButton}
            >
              Delete Product
            </button>
          </div>

          {/* confirmation box */}
          <div
            className={`${
              deleteButton
                ? "w-[100%] h-[100%] flex justify-center items-center  bg-text4 fixed inset-0 "
                : "none"
            } `}
            onClick={deleteProductButton}
          >
            {deleteButton && (
              <div className="bg-secondary w-[30%] h-[30%]  text-center  leading-relaxed text-lg text-text2">
                <p className="text-xl">
                  Are you sure you want to delete your account?
                </p>
                <p className="">
                  You will lose your saved points, orders history, whislist and
                  other offers
                </p>
                <div className="flex justify-around">
                  <button
                    onClick={deleteProductButton}
                    className=" rounded-md p-1 bg-primary text-text4"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteProduct}
                    className="rounded-md p-1 bg-primary text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </form>
      )}

      {error && <p className="text-red-700">{error}</p>}
    </div>
  );
}

export default UpdateProduct;
