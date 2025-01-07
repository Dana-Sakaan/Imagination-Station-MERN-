const Product = require("../models/productModel");


//create Product
const createProduct = async (req, res) => {
  const { productName } = req.body;
  try {
    const product = await Product.findOne({ productName });
    if (product) {
      return res
        .status(404)
        .json({ success: false, message: "Product already exist" });
    }
    const newProduct = await Product.create(req.body);
    res
      .status(200)
      .json({
        success: true,
        message: "Product created successfully",
        newProduct,
      });
  } catch (error) {
    console.log(error);
  }
};

const updateProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product does not exist" });
    }

    res
      .status(200)
      .json({ success: true, message: "Product updated", product });
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findByIdAndDelete(id);
    // if(!product){
    //    return res.status(404).json({success:false, message:"Product does not exist"})
    // }

    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.log(error);
  }
};

const productsWithOffer = async (req, res) => {
  try {
    const offeredProducts = await Product.find({ offer: true });
    res
      .status(200)
      .json({ success: true, offeredProducts, message: "products with offer" });
  } catch (error) {
    console.log(error);
  }
};

const productsOutOfStock = async (req, res) => {
  try {
    const outStock = await Product.find({ quantityInStock: 0 });
    res.status(200).json({ success: true, outStock });
  } catch (error) {
    console.l
  }
};

const getProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product does not exist" });
    }
    res.status(200).json({ success: true, message: "Product", product });
  } catch (error) {
    console.log(error);
  }
};

  const getProductss = async (req,res) => {
    try {
      const categoryValues = await Product.distinct("category");
      const brandValues = await Product.distinct("brand");
      const ageValues = await Product.distinct("age");

      const searchParams = req.query;

    let searchTerm = searchParams.searchTerm || "";

    let category = searchParams.category;
    if (category == "") {
      category =  { $nin: [""] } ;
    }

    let age = searchParams.age;
    if (age == "") {
      age = { $nin: [""] } ;
    }

    let brand = searchParams.brand;
    if (brand == "") {
      brand =  { $nin: [""]};
    }

    let offer = searchParams.offer;
    if (offer === undefined || offer === "false") {
      offer = { $in: [false, true] };
    }

    let sort;
    if (searchParams.sortBy == "asc"){
      sort = 1
    }else{
      sort = -1
    }

    const page = parseInt(searchParams.page)
    const skip = ((page-1)* 9);
    const total = await Product.countDocuments();
    const pages = Math.ceil(total/9)

    const searchedProducts = await Product.find({
      productName: { $regex: searchTerm, $options: "i" },
      offer,
      category,
      age,
      brand
    }).skip(skip).limit(9).sort({productPrice: sort});

    // console.log(searchedProducts)
    res.status(200).json({success:true, searchedProducts, pages,categoryValues,brandValues,ageValues});
    
    } catch (error) {
      console.log(error)
    }
  };

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  productsWithOffer,
  getProduct,
  productsOutOfStock,
  getProductss
};
