import { useState } from "react";
import axios from "axios";
import { app, storage } from "../../utils/firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";

function AddProduct() {
  const [images, setImages] = useState([]);
  const [imagesError, setImagesError] = useState(false);
  const [uploadingStatus, setUploadingStatus] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState({
    productName: "",
    category: "",
    productPrice: 0,
    quantityInStock: 0,
    brand: "",
    age: "",
    offer: false,
    discountPercent: 0,
    productDescription: "",
    productImages: [],
  });

  // console.log(images);
  const handleChange = (e) => {
    if (e.target.type == "checkbox") {
      setProductData({ ...productData, offer: e.target.checked });
    } else {
      setProductData({ ...productData, [e.target.id]: e.target.value });
    }
  };
  // console.log(productData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(productData.productImages.length == 0){
        return setError('you must upload product images first')
      }
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8000/api/product/createproduct",
        productData,
        { withCredentials: true }
      );
      console.log(res.data.newProduct);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error.response.message);
    }
  };

  const handleImageUpload = async () => {
    try {
      setUploadingStatus(true);
      console.log("1");
      if (images.length > 6) {
        setUploadingStatus(false)
        return setImagesError("You can only upload 6 images");
      }
      for (let i = 0; i < images.length; i++) {
        const fileName = new Date().getTime() + images[i].name;
        const storageRef = ref(storage, fileName);

        uploadBytes(storageRef, images[i])
          .then((snapshot) => {
            getDownloadURL(snapshot.ref)
              .then((url) => {
                setProductData((prevData) => ({
                  ...prevData,
                  productImages: [...prevData.productImages, url],
                }));
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      }
      console.log("100%");
      setUploadingStatus(false);
    } catch (error) {
      setImagesError(error.message);
      console.log(error);
    }
  };

  const handleRemoveImage = (index) => {
    console.log("1");
    setProductData({
      ...productData,
      productImages: productData.productImages.filter((_,i) => i !== index),
    });
  };

  return (
    <div className="ml-[10%]">
      <p className="text-2xl text-primary font-bold mb-3">Add new product</p>

      <form className=" flex" onSubmit={handleSubmit}>
        <div className="flex flex-col text-lg">
          <label htmlFor="" className="mb-1  mt-2  text-primary">
            Product Name:
          </label>
          <input
            value={productData.productName}
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
            value={productData.productPrice}
            onChange={handleChange}
            type="number"
            id="productPrice"
            required
            className="rounded-md w-[100%] p-1"
          />

          <label className="mb-1  mt-2  text-primary">Quantity in stock:</label>
          <input
            value={productData.quantityInStock}
            onChange={handleChange}
            type="number"
            id="quantityInStock"
            required
            className="rounded-md w-[100%]  p-1"
          />

          <label className="mb-1  mt-2  text-primary">Product brand:</label>
          <input
            value={productData.brand}
            onChange={handleChange}
            type="text"
            id="brand"
            required
            className=" mb-1 mt-2 p-1 rounded-md w-[100%] "
          />

          <label className="mb-1  mt-2  text-primary">Category:</label>
          <input
            type="text"
            value={productData.category}
            name="category"
            id="category"
            className="mb-1 mt-2 p-1 rounded-md w-[100%]"
            onChange={handleChange}
          />

          <label className="mb-1  mt-2  text-primary">Age:</label>
          <input
            type="text"
            value={productData.age}
            name="age"
            id="age"
            className="mb-1 mt-2 p-1 rounded-md w-[100%]"
            onChange={handleChange}
          />

          <label className="mb-1 mt-2  text-primary">
            Offer:
            <input
              checked={productData.offer}
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
            disabled={!productData.offer}
            value={productData.discountPercent}
            onChange={handleChange}
            type="number"
            id="discountPercent"
            className="rounded-md w-[100%] p-1"
          />

          <label className="mb-1  mt-2  text-primary">
            Product Description:
          </label>
          <textarea
            value={productData.productDescription}
            onChange={handleChange}
            name=""
            id="productDescription"
            className="rounded-md w-[100%] p-1"
          ></textarea>

          <button
            type="submit"
            className="bg-primary mt-4 rounded-md text-text4 p-1"
            disabled={loading || uploadingStatus}
          >
            {loading ? "Loading..." : "Add product"}
          </button>

          {error ? <p className="text-red-700">{error}</p> : ""}
        </div>

        <div className="ml-[100px]">
          <p className="text-primary text-xl mb-1">Product images(max 6)</p>
          <p className="text-primary text-lg mb-1">
            Note: Upload images before adding product
          </p>
          <input
            type="file"
            accept="images/*"
            multiple
            onChange={(e) => {
              setImages(e.target.files);
            }}
          />
          <button
            disabled={loading || uploadingStatus}
            type="button"
            className="bg-primary text-text4 rounded-md p-1 text-lg"
            onClick={handleImageUpload}
          >
            {uploadingStatus
              ? `Uploading...`
              : "Upload Images"}
          </button>

          {productData.productImages.length
            ? productData.productImages.map((url, index) => (
                <div className="mt-6 flex justify-between text-lg" key={url}>
                  <img src={url} alt="product Image" className="w-20 h-20" />
                  <button
                    type="button"
                    className="border-none text-red-700"
                    onClick={() => {
                      handleRemoveImage(index);
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))
            : " "}

          {imagesError && <p className="text-red-700 text-lg">{imagesError}</p>}
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
