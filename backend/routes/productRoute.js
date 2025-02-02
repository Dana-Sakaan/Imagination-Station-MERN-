const express = require("express")
const { createProduct, updateProduct, deleteProduct, getProduct, productsWithOffer, productsOutOfStock, getProductss} = require("../controllers/productCont")
const { isAuth, isAdmin } = require("../middleware/authMiddleware")
const router = express.Router()

router.post('/createproduct', isAuth, isAdmin, createProduct)
router.patch('/updateproduct/:id' , isAuth,isAdmin, updateProduct)
router.delete('/deleteproduct/:id', isAuth, isAdmin, deleteProduct)
router.get('/out-of-stock' , isAuth, isAdmin , productsOutOfStock)
router.get("/products/:id", getProduct)
router.get("/offer", productsWithOffer)
router.get('/getproducts' , getProductss)
// router.get("/test" , test)

module.exports = router