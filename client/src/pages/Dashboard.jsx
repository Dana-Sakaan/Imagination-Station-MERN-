import {NavLink, Outlet} from "react-router-dom"

function Dashboard() {
  return (
    <section className="flex h-[100%] m-10">
      <div className="bg-color1 rounded-lg flex flex-col h-screen text-color2 ">
      <h2 className='p-8 pb-3 text-1xl font-bold text-color4'>Admin Dashboard</h2>
      <nav className='p-10 pt-0 text-1xl font-semibold'>
         <NavLink to='addproduct' className="block p-1 hover:text-color4">Add Product</NavLink>
         <NavLink to='orders' className="block p-1 hover:text-color4">Orders Management</NavLink>
         <NavLink to='out-of-stock' className="block p-1 hover:text-color4">Products Management</NavLink>
         <NavLink className="block p-1 hover:text-color4">Statistics</NavLink>

      </nav>
      </div>
      
      <Outlet/>
    </section>
  )
}

export default Dashboard
