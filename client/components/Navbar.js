import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <img id="logo-img" src="http://localhost:8080/logo_nav_img.png" />
    <nav>
      {isLoggedIn ? (
        <div className="nav-bar">
          {/* The navbar will show these links after you log in */}
          {console.log("logged in")}
          <div className="nav-left">
            <Link to="/menu">Menu</Link>
            <Link to="/cart">Cart</Link>
          </div>
          <div className="nav-right">
            <Link to="/home">Home</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <div className="nav-bar">
            <div>
              <Link to="/menu">Menu</Link>
              <Link to="/cart">Cart</Link>
            </div>
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
    <hr />
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
