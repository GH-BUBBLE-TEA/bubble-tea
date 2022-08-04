import React from "react";
import { connect } from "react-redux";
import { getCartInfo } from "../store/lineItems";

class Cart extends React.Component {
  componentDidMount() {
    this.props.getCartInfo();
  }
  render() {
    console.log(this.props);
    return <h1>Shopping Cart:</h1>;
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getCartInfo: () => dispatch(getCartInfo()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
