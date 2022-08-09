import React from "react";
// import { connect } from "react-redux";
// import { useState } from "react";

// import StripeCheckout from "react-stripe-checkout";

// import axios from "axios";

// import { toast } from "react-toastify";

// import "react-toastify/dist/ReactToastify.css";

export default class CheckOut extends React.Component {
  // export function Checkout() {
  render() {
    //   toast.configure();

    //   const [product] = useState({
    //     name: "Sample Book",
    //     price: 120,
    //     description: "This is a sample book",
    //   });

    //   async function handleToken(token, addresses) {
    //     const response = await axios.post("http://localhost:8080/checkout", {
    //       token,
    //       product,
    //     });

    //     console.log(response.status);

    //     if (response.status === 200) {
    //       toast("Success! Check email for details", { type: "success" });
    //     } else {
    //       toast("Something went wrong", { type: "error" });
    //     }
    //   }
    return (
      <div>
        {/* //       <div className="App">
//         <div className="container">
//           <br />
//           <br />
//           <h1 className="text-center">Stripe Checkout</h1>
//           <br />
//           <h2 className="text-center">Product Info</h2>
//           <h3 className="text-center">Product Name: {product.name}</h3>
//           <h3 className="text-center">Product Price: {product.price}</h3>
//           <h3 className="text-center">
//             Product Description: {product.description}
//           </h3>
//           <br />
//           <div className="form-group container">
//             <StripeCheckout */}
        {/* //               className="center"
//               stripeKey="sk_test_51LTS7NIwzaRDf6W3gBKQBojbpdkrb6OKtfedfVomiGGmJ0FTinkuOxboUTaCNQFgzZGtmRPiC5TSMl1KfSIqTUnT00RHLjMYmJ"
//               token={handleToken}
//               amount={product.price * 100}
//               name="Sample Book"
//               billingAddress
//               shippingAddress
//             /> */}
        {/* //           </div> */}
        {/* //         </div> */}
        {/* //       </div> */}
        <h1>Review your order:</h1>
        <h3>Total items in the cart: NUM</h3>
        <p>
          Products, for each: name, <button>-</button> qty <button>+</button>
          <button>Delete</button>, price
        </p>
        <h4>Total prices: </h4>
        <button>Check out</button>
      </div>
    );
  }
}

// function App() {
//   toast.configure();

//   const [product] = useState({
//     name: "Sample Book",
//     price: 120,
//     description: "This is a sample book",
//   });

//   async function handleToken(token, addresses) {
//     const response = await axios.post("http://localhost:8080/checkout", {
//       token,
//       product,
//     });

//     console.log(response.status);

//     if (response.status === 200) {
//       toast("Success! Check email for details", { type: "success" });
//     } else {
//       toast("Something went wrong", { type: "error" });
//     }
//   }

//   return (
//     <div className="App">
//       <div className="container">
//         <br />
//         <br />
//         <h1 className="text-center">Stripe Checkout</h1>
//         <br />
//         <h2 className="text-center">Product Info</h2>
//         <h3 className="text-center">Product Name: {product.name}</h3>
//         <h3 className="text-center">Product Price: {product.price}</h3>
//         <h3 className="text-center">
//           Product Description: {product.description}
//         </h3>
//         <br />
//         <div className="form-group container">
//           <StripeCheckout
//             className="center"
//             stripeKey="##yourpublishablekey##"
//             token={handleToken}
//             amount={product.price * 100}
//             name="Sample Book"
//             billingAddress
//             shippingAddress
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
