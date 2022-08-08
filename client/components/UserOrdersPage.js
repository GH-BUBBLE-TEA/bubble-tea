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
        <div>Orders History:</div>
        {this.props.orders.length !== 0 ? (
          this.props.orders.map((order) => {
            return <div key={order.id}>Order Number: {order.id}</div>;
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
  //   isAdmin: !!state.auth.isAdmin,
});

const mapDispatch = (dispatch, { history }) => ({
  getOrders: (userId) => dispatch(getOrders(userId)),
});

export default connect(mapState, mapDispatch)(UserOrdersPage);
