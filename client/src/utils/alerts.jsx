// import axios from 'axios';
// import Swal from 'sweetalert2'


// export const deleteAlert = ()=>{
//    Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Delete it!"
//     }).then((result) => {
//       if (result.isConfirmed) {
//         Swal.fire({
//           title: "Deleted!",
//           text: "Your file has been deleted.",
//           icon: "success"
//         });
//       }
//     });
// }


// export const successAlert = ()=>{
//    Swal.fire({
//       position: "center",
//       icon: "success",
//       title: "Your work has been saved",
//       showConfirmButton: false,
//       timer: 1500
//     });
// }


// const res = axios.post("http://localhost:8000/api/order/placeorder", orderData)
//            console.log("order placed")
//            localStorage.removeItem('cart')
//            setQty(qty -1)
//            Swal.fire({
//              title: "Placed!",
//              text: "Your order has been placed.",
//              icon: "success"
//            });


















//            const handlePointsDiscount = ()=>{
//             try {
//                 Swal.fire({
//                     title: "Do you want to use collected points?",
//                     text: "You won't be able to revert this!",
//                     icon: "question",
//                     showCancelButton: true,
//                     confirmButtonColor: "#3085d6",
//                     cancelButtonColor: "#d33",
//                     confirmButtonText: "Use points!"
//                   }).then((result) => {
//                     if (result.isConfirmed) {
//                       const res = axios.put(`http://localhost:8000/api/user/pointsdiscount/${currentUser._id}`, {},{withCredentials: true})
//                       orderTotal = orderTotal - 1;
//                       console.log(orderTotal)
//                       Swal.fire({
//                         title: "Discount applied!",
//                         icon: "success"
//                       });
//                     }
//                   });
//             } catch (error) {
//               console.log(error)
//             }
//           }
        
        
//           let orderData = {customerData , cartItems, orderTotal,productsTotalPrice ,shippingPrice}
        
//           const handlePlaceOrder = ()=>{
//              try {
//                Swal.fire({
//                     title: "Place Order?",
//                     icon: "question",
//                     showCancelButton: true,
//                     confirmButtonColor: "#3085d6",
//                     cancelButtonColor: "#d33",
//                     confirmButtonText: "Place it!"
//                   }).then((result) => {
//                     if (result.isConfirmed) {
//                       const res = axios.post("http://localhost:8000/api/order/placeorder", orderData)
//                       console.log("order placed")
//                       localStorage.removeItem('cart')
//                       setQty(qty -1)
//                       Swal.fire({
//                         title: "Placed!",
//                         text: "Your order has been placed.",
//                         icon: "success"
//                       });
//                     }
//                   });
//              } catch (error) {
//                console.log(error)
//              }
//           }
        