import axios from "axios";
import React from "react";
import { connect } from "react-redux";
//import { Link } from "react-router-dom";
import { getSingleBubbleTea } from "../store/singleBubbleTea";

import { addToCart } from "../store/lineItems";

export class SinglePage extends React.Component {
  componentDidMount() {
    this.props.getSingleBubbleTea(this.props.match.params.id);
  }

  render() {
    const bubbleTea = this.props.bubbleTea;
    return (
      <div>
        <main>
          <h1>{bubbleTea.teaName}</h1>
          <img src={bubbleTea.imageURL} />
          <h3>${bubbleTea.defaultPrice}</h3>
          <h4>{bubbleTea.description}</h4>
          <button onClick={() => this.props.addToCart(bubbleTea)}>
            Add to Cart
          </button>
        </main>
      </div>
    );
  }
}

const mapState = (state) => ({
  bubbleTea: state.singleBubbleTea,
});

const mapDispatch = (dispatch) => ({
  getSingleBubbleTea: (id) => dispatch(getSingleBubbleTea(id)),
  addToCart: (bubbleTea) => dispatch(addToCart(bubbleTea)),
});

export default connect(mapState, mapDispatch)(SinglePage);
