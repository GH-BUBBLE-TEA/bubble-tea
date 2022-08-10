import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import { me } from "./store";
import Menu from "./components/Menu";
import SinglePage from "./components/SinglePage";
import Cart from "./components/Cart";
import CreateBubbleTea from "./components/CreateBubbleTea";
import EditBubbleTea from "./components/EditBubbleTea";
import EditUser from "./components/EditUser";
import UserOrdersPage from "./components/UserOrdersPage";
// import CheckOut from "./components/CheckOut.JS";
import UserSingleOrderPage from "./components/UserSingleOrderPage";
import Stripe from "./components/Stripe";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn, isAdmin } = this.props;
    return (
      <div>
        {isLoggedIn ? (
          <div>
            <Switch>
              <Route exact path="/home" component={Home} />
              {/* <Redirect to="/home" /> */}
              <Route exact path="/home/edit/:id" component={EditUser} />
              <Route exact path="/menu" component={Menu} />
              {isAdmin ? (
                <Route exact path="/menu/create" component={CreateBubbleTea} />
              ) : (
                ""
              )}
              {isAdmin ? (
                <Route path="/menu/edit/:id" component={EditBubbleTea} />
              ) : (
                ""
              )}
              <Route path="/menu/:id" component={SinglePage} />

              <Route exact path="/cart" component={Cart} />
              <Route exact path="/orders" component={UserOrdersPage} />
              <Route path="/orders/:id" component={UserSingleOrderPage} />
              <Route path="/payment" component={Stripe} />
              {/* <Route exact path="/checkout" component={CheckOut} /> */}
            </Switch>
          </div>
        ) : (
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route exact path="/menu" component={Menu} />
            <Route path="/menu/:id" component={SinglePage} />
            <Route exact path="/cart" component={Cart} />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    isAdmin: !!state.auth.isAdmin,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
