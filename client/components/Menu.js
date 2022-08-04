import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getBubbleTeas } from "../store/bubbleTeas";

export class Menu extends React.Component {
  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    return (
      <div>
        <h1>MENU</h1>
        <Link to="/cart">Cart</Link>
        <div>
          {this.props.bubbleTeas.map((bubbleTea) => (
            <div key={bubbleTea.id}>
              <div>
                <Link to={`/menu/${bubbleTea.id}`}>
                  <img src={bubbleTea.imageURL} />
                  <h3>{bubbleTea.teaName}</h3>
                </Link>
                <p>Price: ${bubbleTea.defaultPrice}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    bubbleTeas: state.bubbleTeas,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchData: () => dispatch(getBubbleTeas()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
