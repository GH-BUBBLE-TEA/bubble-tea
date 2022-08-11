import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getAllOrders } from "../store/orders";
import { getSingleUser } from "../store/singleUser";

class AllOrdersHistory extends React.Component {
  componentDidMount() {
    this.props.getAllOrders();
  }

  render() {
    console.log("this.props.orders:", this.props.orders);
    return (
      <React.Fragment>
        <div>
          <h3>ALL USERS ORDERS:</h3>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Order Number</th>
                <th>Customer</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {this.props.orders.map((singleOrder, index) => {
                return (
                  <tr key={singleOrder.id}>
                    <td>
                      <Link to={`/orders/edit/${singleOrder.id}`}>
                        {singleOrder.id}
                      </Link>
                    </td>

                    <td>{singleOrder.user.username}</td>
                    <td>{singleOrder.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Link to="/home">
          <button>Return to the home page</button>
        </Link>
      </React.Fragment>
    );
  }
}

const mapState = (state) => ({
  orders: state.orders,
});

const mapDispatch = (dispatch) => ({
  getAllOrders: () => dispatch(getAllOrders()),
  getSingleUser: (userId) => dispatch(getSingleUser(userId)),
});

export default connect(mapState, mapDispatch)(AllOrdersHistory);
