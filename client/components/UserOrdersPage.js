import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getOrders } from "../store/orders";

class UserOrdersPage extends React.Component {
  componentDidMount() {
    this.props.getOrders(this.props.id);
  }

  render() {
    console.log("this.props.orders", this.props.orders);
    return (
      <React.Fragment>
        <div>
          <h2>Orders History:</h2>
        </div>
        {this.props.orders ? (
          this.props.orders.map((order, index) => {
            return (
              <div key={index}>
                <Link to={`/orders/${order.orderId}`}>
                  <h3>Order Number: {order.orderId}</h3>
                </Link>
                <p>Status: {order.status}</p>
              </div>
            );
          })
        ) : (
          <p>Sorry, you have not ordered anything yet! Start shopping!</p>
        )}
      </React.Fragment>
    );
  }
}

const mapState = (state) => ({
  orders: state.orders,
  id: state.auth.id,
});

const mapDispatch = (dispatch, { history }) => ({
  getOrders: (userId) => dispatch(getOrders(userId)),
});

export default connect(mapState, mapDispatch)(UserOrdersPage);
