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
    // console.log("this.props.orderId: ", this.props.orders[0][orderId]);
    return (
      <React.Fragment>
        <div>Orders History:</div>
        {this.props.orders.length !== 0 ? (
          // this.props.orders.map((order) => {
          //   <div key={order.id}>Order Number: {order.id}</div>;
          //   order.map((eachItem) => {
          //     return (
          //       <div key={eachItem.id}>Product Number: {eachItem.teaName}</div>
          //     );
          //   });
          // })
          // (<h4>Order Number: {this.props.orders[0].orderId}</h4>)
          this.props.orders.map((item) => {
            return (
              <div key={item.bubbleTeaId}>
                <h5>Product Number: {item.teaName}</h5>
                <h5>Quantity: {item.quantity}</h5>
                <h5>Price: {item.itemPrice}</h5>
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
  //   isAdmin: !!state.auth.isAdmin,
});

const mapDispatch = (dispatch, { history }) => ({
  getOrders: (userId) => dispatch(getOrders(userId)),
});

export default connect(mapState, mapDispatch)(UserOrdersPage);
