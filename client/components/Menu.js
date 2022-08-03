import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getBubbleTeas } from "../store/bubbleTeas";

export class Menu extends React.Component {
  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    console.log(this.props.bubbleTeas);
    console.log(
      this.props.bubbleTeas.map((bubbleTea) => {
        bubbleTea.imageURL, bubbleTea.teaName, bubbleTea.defaultPrice;
      })
    );
    return (
      <div>
        <h1>MENU</h1>
        <div>
          {this.props.bubbleTeas.map((bubbleTea) => (
            <div key={bubbleTea.id}>
              <div>
                <Link to={`/bubbleTeas/${bubbleTea.id}`}>
                  <img src={bubbleTea.imageURL} />
                  <h3>{bubbleTea.teaName}</h3>
                </Link>
                <p>Base Price: {bubbleTea.defaultPrice}</p>
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
