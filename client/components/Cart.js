import React from "react";
import { connect } from "react-redux";
import { getCartInfo } from "../store/lineItems";
import { getSingleBubbleTea } from "../store/singleBubbleTea";
import { deleteFromCart, updateQuantity } from "../store/lineItems";
import { Link } from "react-router-dom";
import { checkout } from "../store/orders";
import { updateStock } from "../store/bubbleTeas";
import Stripe from "./Stripe";

export class Cart extends React.Component {
  componentDidMount() {
    this.props.getCartInfo();
  }

  checkout(orderId, cart) {
    this.props.checkout(orderId);
    this.props.getCartInfo();
    this.props.updateStock(cart);
  }

  render() {
    let finalCost = 0;
    let totalItems = 0;
    return (
      <div className="cartPage">
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
                        onClick={() =>
                          this.props.updateQuantity({
                            ...cartItem,
                            quantity: cartItem.quantity - 1,
                          })
                        }
                      >
                        -
                      </button>{" "}
                      Quantity: {cartItem.quantity}
                      <button
                        onClick={() =>
                          this.props.updateQuantity({
                            ...cartItem,
                            quantity: cartItem.quantity + 1,
                          })
                        }
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
            <Stripe total={finalCost} cart={this.props.cart} />
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
  updateQuantity: (item) => dispatch(updateQuantity(item)),

  checkout: (orderId) => dispatch(checkout(orderId)),
  updateStock: (cart) => dispatch(updateStock(cart)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
