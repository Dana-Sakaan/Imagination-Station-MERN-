import { BrowserRouter , Route, Routes , Link } from "react-router-dom"

import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import About from "./pages/About"
import Profile from "./pages/Profile"
import Wishlist from "./pages/Wishlist"
import Cart from "./pages/Cart"
import ProductCard from "./components/ProductCard"
import ProtectedRoute from "./components/protectedRoute"
import Signup from "./components/Signup"
import Signin from "./components/Signin"
import AuthorizeRoute from "./components/AuthorizeRoute"
import Dashboard from "./pages/Dashboard"
import AddProduct from "./components/Admin/AddProduct"
import Orders from "./components/Admin/Orders"
import ProductDetails from "./pages/ProductDetails"
import Search from "./components/Search"
import Footer from "./components/Footer"
import UpdateProduct from "./components/Admin/UpdateProduct"
import OutStockProducts from "./components/Admin/OutStockProducts"
import OrderDetails from "./components/Admin/orderDetails"
import UserMessages from "./components/Admin/UserMessages"

function App() {

  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/products" element={<Search/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path= "/signup" element={<Signup/>}/>
        <Route path= "/signin" element={<Signin/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/product-details/:productId" element={<ProductDetails/>}/>

        <Route element={<ProtectedRoute/>}>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/wishlist" element={<Wishlist/>}/>
        </Route>

        <Route element={<AuthorizeRoute/>}>
            <Route path="/dashboard" element={<Dashboard/>}> 
              <Route path="addproduct" element={<AddProduct/>}/>
              <Route path="orders" element={<Orders/>}/>
              <Route path="out-of-stock" element={<OutStockProducts/>}/>
              <Route path="messages" element={<UserMessages/>}/>
              
            </Route>
            <Route path="/getOrder/:id" element={<OrderDetails/>} />
            <Route path="/update-product/:productId" element={<UpdateProduct/>}/>
          </Route>

        <Route path="/cart" element={<Cart/>}/>
        <Route path="/test" element={<ProductCard/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
