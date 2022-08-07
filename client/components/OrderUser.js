import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export class OrderUser extends React.Component {
  componentDidMount() {
    // this.props.getSingleBubbleTea(this.props.match.params.id);
  }

  render() {
    return <div>this is the cart</div>;
  }
}

// const mapState = (state) => ({
//   bubbleTea: state.singleBubbleTea,
//   isAdmin: !!state.auth.isAdmin,
// });

// const mapDispatch = (dispatch, { history }) => ({
//   getSingleBubbleTea: (id) => dispatch(getSingleBubbleTea(id)),
//   addToCart: (bubbleTea) => dispatch(addToCart(bubbleTea)),
//   deleteBubbleTea: (id) => dispatch(deleteBubbleTea(id, history)),
// });
export default OrderUser;
// export default connect(mapState, mapDispatch)(OrderUser);
