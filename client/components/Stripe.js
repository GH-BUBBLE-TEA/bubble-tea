import StripeCheckout from "react-stripe-checkout";
import React from "react";
import { checkout } from "../store/orders";
import { getCartInfo } from "../store/lineItems";
import { connect } from "react-redux";
import { updateStock } from "../store/bubbleTeas";

// export class Stripe extends React.Component {

const Stripe = (props) => {
  // componentDidMount() {
  //   // console.log(process.env.STRIPE_SECRET_KEY);
  //   this.props.getCartInfo();
  // }

  const handleToken = (token, addresses) => {
    console.log({ token, addresses });
    //TODO: this function is called when you click on stripe
    //we can call a thunk that will call the stripe post route
    //WRITE A THUNK THAT WILL REFER TO APP.POST FROM THE STRIPE DOCS
    //POST WILL TELL US IF PAYMENT WENT THROUGH OR NOT, AND BASED ON THAT WE CHECK THE ITEMS OR NOT

    //PLAN B:
    //WE DON'T VERIFY THE PAYMENT... ASSUME IT WENT THROUGH
    //INSTEAD THIS FUNCTION WILL CALL CHECKOUT
    //TODO: PASS THE CART TO THIS COMPONENT
    //bring stripe.js into the cart component, pass in the cart from there
    //you can fill in the object the amount is referring to with the total of the cart
    //write another function that calculates total
  };

  // render() {
  return (
    <StripeCheckout
      stripeKey="pk_test_51LUXstHolzbNAuE0QUePpMIwWy91KxuITkfWyaSgWQ9eDoYSo4wOP96x0tU9juDk6gmIuLks695PFqrFEVe0q7zg000B0Ji0kz"
      token={handleToken}
      billingAddress // = var defined from user info
      shippingAddress // = var defined from user info
      // amount={cartItems.length ? cartItems.reduce((a, b) => a + b, 0) : 0}
      // amount={guestCart ? guestTotal * 100 : total}
    />
  );
  // }
};

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

export default connect(mapStateToProps, mapDispatchToProps)(Stripe);
