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
          <h2 className="large-page-name">{bubbleTea.teaName}</h2>
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

          <img className="single-image" src={bubbleTea.imageURL} />
          <h3>${bubbleTea.defaultPrice}</h3>
          <h4>{bubbleTea.description}</h4>
          <div>
            {bubbleTea.stock > 0 ? (
              <div>
                Available stock: {bubbleTea.stock}
                <div>
                  <button onClick={() => this.props.addToCart(bubbleTea)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            ) : (
              <div>Sorry, this product is currently not available</div>
            )}
          </div>
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
