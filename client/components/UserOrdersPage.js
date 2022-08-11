import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getUserOrders } from "../store/singleUser";

class UserOrdersPage extends React.Component {
  componentDidMount() {
    this.props.getUserOrders(this.props.id);
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <h2>Orders History:</h2>
        </div>
        {this.props.orders ? (
          this.props.orders.map((order, index) => {
            return (
              <div key={index}>
                <Link to={`/users/${order.orderId}/orders`}>
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
  user: state.user,
  id: state.auth.id,
});

const mapDispatch = (dispatch, { history }) => ({
  getUserOrders: (userId) => dispatch(getUserOrders(userId)),
});

export default connect(mapState, mapDispatch)(UserOrdersPage);
