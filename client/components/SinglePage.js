import axios from "axios";
import React from "react";
import { connect } from "react-redux";
//import { Link } from "react-router-dom";
import {
  getSingleBubbleTea,
  sendBubbleTeaToCart,
} from "../store/singleBubbleTea";

export class SinglePage extends React.Component {
  componentDidMount() {
    this.props.getSingleBubbleTea(this.props.match.params.id);
  }

  render() {
    const bubbleTea = this.props.bubbleTea;
    return (
      <div>
        <main>
          <h1>A BUBBLE TEA</h1>
          <img src={bubbleTea.imageURL} />
          <h1>{bubbleTea.name}</h1>
          <h3>${bubbleTea.defaultPrice}</h3>
          <h4>{bubbleTea.description}</h4>
          <button
            onClick={() =>
              this.props.sendBubbleTeaToCart(this.props.match.params.id)
            }
          >
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
  sendBubbleTeaToCart: (id) => dispatch(sendBubbleTeaToCart(id)),
});

export default connect(mapState, mapDispatch)(SinglePage);
