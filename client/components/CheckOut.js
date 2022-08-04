import React from "react";
import { connect } from "react-redux";

export default class CheckOut extends React.Component {
  render() {
    return (
      <div>
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
