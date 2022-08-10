import StripeCheckout from "react-stripe-checkout";
import React from "react";
import { checkout } from "../store/orders";
import { getCartInfo } from "../store/lineItems";
import { connect } from "react-redux";
import { updateStock } from "../store/bubbleTeas";

export class Checkout extends React.Component {
  componentDidMount() {
    this.props.getCartInfo();
  }

  handleToken = (token, addresses) => {
    console.log({ token, addresses });
    // if (guestCart) {
    //   window.localStorage.removeItem("guest_cart");
    //   props.history.push("/cartItem");
    // } else {
    this.props.checkout(this.props.cartItems[0].orderId);
    this.props.updateStock(this.props.cartItems);
    // }
  };

  render() {
    return (
      <StripeCheckout
        stripeKey="pk_test_51KsvEULlpsgBXKcLbXvhXNBmgCOpP5onZSkJZmOjFjWVAHmxEelPZb1v9nJscCWPYi19bdKAxwcSlx8dDNh20LmK00Q7tIgcbV"
        token={handleToken}
        billingAddress // = var defined from user info
        shippingAddress // = var defined from user info
        // amount={cartItems.length ? cartItems.reduce((a, b) => a + b, 0) : 0}
        amount={guestCart ? guestTotal * 100 : total}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCartInfo() {
      dispatch(getCartInfo());
    },
    checkout(orderId) {
      dispatch(checkout(orderId));
    },
    updateStock(cart) {
      dispatch(updateStock(cart));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
