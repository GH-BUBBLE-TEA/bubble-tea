import axios from "axios";

const GOT_CART = "GOT_CART";

const gotCartInfo = (items) => {
  return {
    type: GOT_CART,
    items,
  };
};

export const getCartInfo = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("api/lineItems");
      dispatch(gotCartInfo(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export default function cartReducer(state = [], action) {
  switch (action.type) {
    case GOT_CART:
      return action.items;
    default:
      return state;
  }
}
