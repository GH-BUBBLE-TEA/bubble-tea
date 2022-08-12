import StripeCheckout from "react-stripe-checkout";
import React from "react";
import { checkout } from "../store/orders";
import { getCartInfo } from "../store/lineItems";
import { connect } from "react-redux";
import { updateStock } from "../store/bubbleTeas";

const Stripe = (props) => {
  const handleToken = (token, addresses) => {
    console.log(token);
    props.checkout(token.id);
  };

  return (
    <StripeCheckout
      stripeKey="pk_test_51LUXstHolzbNAuE0QUePpMIwWy91KxuITkfWyaSgWQ9eDoYSo4wOP96x0tU9juDk6gmIuLks695PFqrFEVe0q7zg000B0Ji0kz"
      token={handleToken}
      billingAddress
      shippingAddress
      amount={props.total * 100}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getCartInfo: () => dispatch(getCartInfo()),
  checkout: (orderId) => dispatch(checkout(orderId)),
  updateStock: (cart) => dispatch(updateStock(cart)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Stripe);
