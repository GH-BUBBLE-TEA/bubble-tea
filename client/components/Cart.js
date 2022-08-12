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
        <h1 id="large-page-name">SHOPPING CART:</h1>
        {this.props.cart ? (
          <div className="cart-info-all">
            <h2>
              {this.props.cart.map((cartItem) => {
                finalCost += cartItem.itemPrice * cartItem.quantity;
                totalItems += cartItem.quantity;
                return (
                  <div key={cartItem.id} className="cartInfo">
                    <div className="cart-tea-name">
                      <Link to={`/menu/${cartItem.bubbleTeaId}`}>
                        <h4>{cartItem.teaName}</h4>
                      </Link>
                    </div>
                    <div className="cart-img">
                      <img
                        className="inside-cart-img"
                        src={cartItem.imageURL}
                      />
                    </div>
                    <h5 className="cart-quantity">
                      <div className="quantity-button">
                        <button
                          className="cart-button"
                          onClick={() =>
                            this.props.updateQuantity({
                              ...cartItem,
                              quantity: cartItem.quantity - 1,
                            })
                          }
                        >
                          -
                        </button>{" "}
                        <div className="quantity-text">
                          Quantity: {cartItem.quantity}
                        </div>
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
                      </div>
                      Total Price: ${cartItem.itemPrice * cartItem.quantity}
                      <div className="cart-delete-button">
                        <button
                          onClick={() => this.props.deleteFromCart(cartItem.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </h5>
                  </div>
                );
              })}
            </h2>
            <h3>Total items in the cart: {totalItems} </h3>

            <div className="grand-total-cart">
              <h4>Grand Total: ${finalCost}</h4>
            </div>

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
