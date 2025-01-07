const express = require("express")
const { signUp, signIn, signOut, google} = require("../controllers/authCont")
const { isAuth, isAdmin } = require("../middleware/authMiddleware")
const router = express.Router()

router.post("/signup", signUp)
router.post("/signin" ,signIn)
router.get("/signout/",  signOut)
router.post("/google", google)
// router.get('/test', isAuth, (req,res)=>{
//    res.json("you are authenticated")
// })
// router.get('/profile/:id', isAuth , profile)
// router.get('/admin', isAuth, isAdmin, (req,res)=>{
//    res.json("you are an admin")
// })


module.exports = router