import {NavLink, Outlet} from "react-router-dom"

function Dashboard() {
  return (
    <section className="flex h-[100%] m-10">
      <div className="bg-primary rounded-lg flex flex-col h-screen text-text4 ">
      <h2 className='p-8 pb-3 text-1xl font-bold text-secondary'>Admin Dashboard</h2>
      <nav className='p-10 pt-0 text-1xl font-semibold'>
         <NavLink to='addproduct' className="block p-1 hover:underline">Add Product</NavLink>
         <NavLink to='orders' className="block p-1 hover:underline">Orders Management</NavLink>
         <NavLink to='out-of-stock' className="block p-1 hover:underline">Products Management</NavLink>
         <NavLink className="block p-1 hover:underline">Statistics</NavLink>

      </nav>
      </div>
      
      <Outlet/>
    </section>
  )
}

export default Dashboard
