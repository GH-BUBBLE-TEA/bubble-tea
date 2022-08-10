import React from "react";
import { connect } from "react-redux";
import { getCartInfo } from "../store/lineItems";
import { getSingleBubbleTea } from "../store/singleBubbleTea";
import {
  deleteFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../store/lineItems";
import { Link } from "react-router-dom";
import { checkout } from "../store/orders";
import { updateStock } from "../store/bubbleTeas";

export class Cart extends React.Component {
  componentDidMount() {
    this.props.getCartInfo();
  }

  checkout(orderId, cart) {
    console.log("CART:", cart);
    this.props.checkout(orderId);
    this.props.getCartInfo();
    this.props.updateStock(cart);
  }

  render() {
    let finalCost = 0;
    let totalItems = 0;
    console.log("this.props.cart: ", this.props.cart);
    console.log("BUBBLE TEA CART: ", this.props.bubbleTea);
    return (
      <div>
        <h1 className="large-page-name">SHOPPING CART:</h1>
        {this.props.cart ? (
          <div>
            <h2>
              {this.props.cart.map((cartItem) => {
                finalCost += cartItem.itemPrice * cartItem.quantity;
                totalItems += cartItem.quantity;
                return (
                  <div key={cartItem.id}>
                    <Link to={`/menu/${cartItem.bubbleTeaId}`}>
                      <h4>- {cartItem.teaName}</h4>
                    </Link>
                    <img className="cart-img" src={cartItem.imageURL} />
                    <h5>
                      <button
                        onClick={() => this.props.decreaseQuantity(cartItem)}
                      >
                        -
                      </button>{" "}
                      Quantity: {cartItem.quantity}
                      <button
                        onClick={() => this.props.increaseQuantity(cartItem)}
                      >
                        +
                      </button>
                      Total Price: ${cartItem.itemPrice * cartItem.quantity}
                      <button
                        onClick={() => this.props.deleteFromCart(cartItem.id)}
                      >
                        Delete
                      </button>
                    </h5>
                  </div>
                );
              })}
            </h2>
            <h3>Total items in the cart: {totalItems} </h3>
            <h4>Grand Total: ${finalCost}</h4>
            {/* <Link to="/checkout"> */}
            <button
              onClick={() =>
                this.checkout(this.props.cart[0].orderId, this.props.cart)
              }
            >
              Check out
            </button>
            {/* </Link> */}
          </div>
        ) : (
          <h3>There is no item in the cart.</h3>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    bubbleTea: state.singleBubbleTea,
  };
};

const mapDispatchToProps = (dispatch, { history }) => ({
  getCartInfo: () => dispatch(getCartInfo()),
  getSingleBubbleTea: (id) => dispatch(getSingleBubbleTea(id)),
  deleteFromCart: (lineItemId) => dispatch(deleteFromCart(lineItemId)),
  increaseQuantity: (item) => dispatch(increaseQuantity(item)),
  decreaseQuantity: (item) => dispatch(decreaseQuantity(item)),

  checkout: (orderId) => dispatch(checkout(orderId)),
  updateStock: (cart) => dispatch(updateStock(cart)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
