import React from "react";
import { connect } from "react-redux";
import { getCartInfo } from "../store/lineItems";
import { getSingleBubbleTea } from "../store/singleBubbleTea";
import { deleteFromCart } from "../store/lineItems";

export class Cart extends React.Component {
  componentDidMount() {
    this.props.getCartInfo();
  }

  render() {
    let finalCost = 0;
    let totalItems = 0;
    console.log(this.props);
    // console.log(this.props.lineItems.getSingleBubbleTea());
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
                  <button>-</button> Quantity: {cartItem.quantity}
                  <button>+</button>Total Price: $
                  {cartItem.itemPrice * cartItem.quantity}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
