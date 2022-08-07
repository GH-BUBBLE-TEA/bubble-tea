import axios from "axios";

const GOT_CART = "GOT_CART";
const ADD_CART = "ADD_CART";
const DELETE_ITEM = "DELETE_ITEM";

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

const deletedFromCart = (item) => {
  return {
    type: DELETE_ITEM,
    item,
  };
};

export const getCartInfo = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      const { data } = await axios.get("/api/lineItems", {
        headers: {
          authorization: token,
        },
      });
      dispatch(gotCartInfo(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const addToCart = (bubbleTea) => {
  return async (dispatch) => {
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

export const deleteFromCart = (bubbleTeaId) => {
  return async (dispatch) => {
    try {
      const { data: lineItem } = await axios.delete(
        `/api/lineItems/${bubbleTeaId}`
      );
      dispatch(deletedFromCart(lineItem));
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
    case DELETE_ITEM:
      return state.filter(
        (item) => item.bubbleTeaId !== action.item.bubbleTeaId
      );
    default:
      return state;
  }
}
