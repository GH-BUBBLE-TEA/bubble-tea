import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getOrder } from "../store/orders";

class UserSingleOrderPage extends React.Component {
  componentDidMount() {
    this.props.getOrder(this.props.id, this.props.match.params.id);
  }

  render() {
    let totalPrice = 0;
    let totalItems = 0;
    return (
      <React.Fragment>
        <div>Orders Number: {this.props.match.params.id}</div>
        {this.props.order.map((orderItem, index) => {
          totalPrice += orderItem.itemPrice * orderItem.quantity;
          totalItems += orderItem.quantity;
          return (
            <div key={index}>
              <h5>Product Number: {orderItem.teaName}</h5>
              <h5>Quantity: {orderItem.quantity}</h5>
              <h5>Price: ${orderItem.itemPrice}</h5>
              <h5>
                Total Item Price: ${orderItem.quantity * orderItem.itemPrice}
              </h5>
            </div>
          );
        })}
        <h4>Total price: ${totalPrice}</h4>
        <h4>Total items: {totalItems}</h4>(
        <Link to="/orders">
          <button>Return to the orders page</button>
        </Link>
        )
      </React.Fragment>
    );
  }
}

const mapState = (state) => ({
  order: state.orders,
  id: state.auth.id,
});

const mapDispatch = (dispatch) => ({
  getOrder: (userId, orderId) => dispatch(getOrder(userId, orderId)),
});

export default connect(mapState, mapDispatch)(UserSingleOrderPage);
