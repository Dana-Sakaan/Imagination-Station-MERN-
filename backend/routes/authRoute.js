const express = require("express")
const { signUp, signIn, signOut, google, subsribeNews} = require("../controllers/authCont")
const { isAuth, isAdmin } = require("../middleware/authMiddleware")
const router = express.Router()

router.post("/signup", signUp)
router.post("/signin" ,signIn)
router.get("/signout/",  signOut)
router.post("/google", google)
router.post('/newsletter', subsribeNews)


module.exports = router