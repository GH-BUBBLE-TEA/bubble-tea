import React from "react";
import { connect } from "react-redux";
//import { getCartInfo } from "../store/lineItems";

export default class Cart extends React.Component {
  // componentDidMount() {
  //   this.props.getCartInfo();
  // }
  render() {
    //console.log(this.props);
    return (
      <div>
        <h1>Shopping Cart:</h1>
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

// const mapStateToProps = (state) => {
//   return {
//     cart: state.cart,
//   };
// };

// const mapDispatchToProps = (dispatch) => ({
//   getCartInfo: () => dispatch(getCartInfo()),
// });

//export default connect(mapStateToProps, mapDispatchToProps)(Cart);
