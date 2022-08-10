import axios from "axios";

const GOT_CART = "GOT_CART";
const ADD_CART = "ADD_CART";
const DELETE_ITEM = "DELETE_ITEM";
const UPDATE_QUANTITY = "UPDATE_QUANTITY";

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

const updatedQuantity = (item) => {
  return {
    type: UPDATE_QUANTITY,
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

export const deleteFromCart = (id) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      const { data: lineItem } = await axios.delete(`/api/lineItems/${id}`, {
        headers: {
          authorization: token,
        },
      });
      dispatch(deletedFromCart(lineItem));
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateQuantity = (item) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      const { data } = await axios.put(`/api/lineItems/${item.id}`, item, {
        headers: {
          authorization: token,
        },
      });
      dispatch(updatedQuantity(data));
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
    case UPDATE_QUANTITY:
      return state.map((item) =>
        item.bubbleTeaId === action.item.bubbleTeaId
          ? { ...item, quantity: action.item.quantity }
          : item
      );
    default:
      return state;
  }
}
