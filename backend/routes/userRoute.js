const express = require("express")
const { isAuth, isAdmin } = require("../middleware/authMiddleware")
const { getProfile, updateProfile, deleteProfile, userMessage, addToWishlist, pointsDiscount,getMessages,messageStatus } = require("../controllers/userCont")
const router = express.Router()

router.get("/profile/:id", isAuth, getProfile)
router.patch('/updateprofile/:id', isAuth,updateProfile)
router.delete('/deleteprofile/:id' , isAuth, deleteProfile)
router.post('/wishlist/:id', isAuth , addToWishlist)
router.put("/pointsdiscount/:id", isAuth, pointsDiscount)
router.post('/message', userMessage )
router.get('/getmessages', isAuth, isAdmin, getMessages)
router.put('/messagestatus/:id', isAuth,isAdmin, messageStatus)



module.exports = router