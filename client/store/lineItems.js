import axios from "axios";

const GOT_CART = "GOT_CART";
const ADD_CART = "ADD_CART";

const gotCartInfo = (items) => {
  return {
    type: GOT_CART,
    items,
  };
};

const addedToCart = (item) => {
  return {
    type: ADD_CART,
    item,
  };
};

// export const getCartInfo = () => {
//   return async (dispatch) => {
//     try {
//       const { data } = await axios.get("/api/lineItems");
//       dispatch(gotCartInfo(data));
//     } catch (err) {
//       console.log(err);
//     }
//   };
// };

export const addToCart = (bubbleTea) => {
  return async (dispatch) => {
    console.log("bubbleTea in thunk: ", bubbleTea);
    try {
      const token = window.localStorage.getItem("token");
      const { data } = await axios.post("/api/lineItems", bubbleTea, {
        headers: {
          authorization: token,
        },
      });
      dispatch(addedToCart(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export default function cartReducer(state = [], action) {
  switch (action.type) {
    case GOT_CART:
      return action.items;
    case ADD_CART:
      return [...state, action.item];
    default:
      return state;
  }
}
