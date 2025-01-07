const express = require("express")
const { isAuth } = require("../middleware/authMiddleware")
const { getProfile, updateProfile, deleteProfile, addToWishlist, pointsDiscount } = require("../controllers/userCont")
const router = express.Router()

router.get("/profile/:id", isAuth, getProfile)
router.patch('/updateprofile/:id', isAuth,updateProfile)
router.delete('/deleteprofile/:id' , isAuth, deleteProfile)
router.post('/wishlist/:id', isAuth , addToWishlist)
router.put("/pointsdiscount/:id", isAuth, pointsDiscount)



module.exports = router