import React from "react";
import { connect } from "react-redux";
import { getCartInfo } from "../store/lineItems";
import { getSingleBubbleTea } from "../store/singleBubbleTea";
import {
  deleteFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../store/lineItems";

export class Cart extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.props.getCartInfo();
  }

  handleClick(item) {
    console.log(this.props);
    this.props.increaseQuantity(item);
    this.props.getCartInfo();
    this.setState();
  }

  render() {
    let finalCost = 0;
    let totalItems = 0;
    return (
      <div>
        <h1>Shopping Cart:</h1>
        <h2>
          {this.props.cart.map((cartItem) => {
            finalCost += cartItem.itemPrice * cartItem.quantity;
            totalItems += cartItem.quantity;
            return (
              <div key={cartItem.bubbleTeaId}>
                <h3>- {cartItem.teaName}</h3>
                <img src={cartItem.imageURL} />
                <h4>
                  <button onClick={() => this.props.decreaseQuantity(cartItem)}>
                    -
                  </button>{" "}
                  Quantity: {cartItem.quantity}
                  <button onClick={() => this.props.increaseQuantity(cartItem)}>
                    +
                  </button>
                  Total Price: ${cartItem.itemPrice * cartItem.quantity}
                  <button
                    onClick={() =>
                      this.props.deleteFromCart(cartItem.bubbleTeaId)
                    }
                  >
                    Delete
                  </button>
                </h4>
              </div>
            );
          })}
        </h2>
        <h3>Total items in the cart: {totalItems} </h3>
        <h4>Grand Total: ${finalCost}</h4>
        <button>Check out</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getCartInfo: () => dispatch(getCartInfo()),
  getSingleBubbleTea: (id) => dispatch(getSingleBubbleTea(id)),
  deleteFromCart: (bubbleTeaId) => dispatch(deleteFromCart(bubbleTeaId)),
  increaseQuantity: (item) => dispatch(increaseQuantity(item)),
  decreaseQuantity: (item) => dispatch(decreaseQuantity(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
