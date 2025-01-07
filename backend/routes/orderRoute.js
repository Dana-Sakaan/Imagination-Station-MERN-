const express = require("express")
const { placeOrder, getOrders, getOrder, orderStatus, cancelOrder } = require("../controllers/orderCont")
const { isAuth, isAdmin } = require("../middleware/authMiddleware")
const router = express.Router()

router.post("/placeorder", placeOrder)
router.get('/getorders', isAuth, isAdmin, getOrders)
router.put('/updateorder/:id', isAuth,isAdmin, orderStatus)
router.get('/getorder/:id', isAuth, isAdmin, getOrder)
router.put('/cancelorder/:id' , isAuth, isAdmin, cancelOrder)

module.exports = router