//import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getSingleBubbleTea } from "../store/singleBubbleTea";
import { deleteBubbleTea } from "../store/bubbleTeas";

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
          {this.props.isAdmin ? (
            <div>
              <Link to={`/menu/edit/${bubbleTea.id}`}>
                <button>Edit</button>
              </Link>
              <button onClick={() => this.props.deleteBubbleTea(bubbleTea.id)}>
                Delete
              </button>
              <p>Stock Level: {bubbleTea.stock}</p>
            </div>
          ) : (
            ""
          )}

          <img src={bubbleTea.imageURL} />
          <h3>${bubbleTea.defaultPrice}</h3>
          <h4>{bubbleTea.description}</h4>
          <button onClick={() => this.props.addToCart(bubbleTea)}>
            Add to Cart
          </button>

          <div>Comments: </div>
        </main>
      </div>
    );
  }
}

const mapState = (state) => ({
  bubbleTea: state.singleBubbleTea,
  isAdmin: !!state.auth.isAdmin,
});

const mapDispatch = (dispatch, { history }) => ({
  getSingleBubbleTea: (id) => dispatch(getSingleBubbleTea(id)),
  addToCart: (bubbleTea) => dispatch(addToCart(bubbleTea)),
  deleteBubbleTea: (id) => dispatch(deleteBubbleTea(id, history)),
});

export default connect(mapState, mapDispatch)(SinglePage);
