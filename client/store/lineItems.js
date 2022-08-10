import axios from "axios";

const GOT_CART = "GOT_CART";
const ADD_CART = "ADD_CART";
const DELETE_ITEM = "DELETE_ITEM";
const INCREASE_QUANTITY = "INCREASE_QUANTITY";
const DECREASE_QUANTITY = "DECREASE_QUANTITY";

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

const increasedQuantity = (item) => {
  return {
    type: INCREASE_QUANTITY,
    item,
  };
};

const decreasedQuantity = (item) => {
  return {
    type: DECREASE_QUANTITY,
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
      const { data: lineItem } = await axios.delete(`/api/lineItems/${id}`);
      dispatch(deletedFromCart(lineItem));
    } catch (err) {
      console.log(err);
    }
  };
};

export const increaseQuantity = (item) => {
  return async (dispatch) => {
    try {
      const { data: bubbleTeaData } = await axios.get(
        `/api/bubbleTeas/${item.bubbleTeaId}`
      );
      const stockLevel = bubbleTeaData.stock;
      if (item.quantity + 1 <= stockLevel) {
        const { data } = await axios.put(`/api/lineItems/${item.id}`, {
          quantity: item.quantity + 1,
        });
        dispatch(increasedQuantity(data));
      } else {
        alert("Sorry, there is no more product left.");
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const decreaseQuantity = (item) => {
  return async (dispatch) => {
    try {
      if ((item.quantity = 1)) {
        const { data: lineItem } = await axios.delete(
          `/api/lineItems/${item.id}`
        );
        dispatch(deletedFromCart(lineItem));
        return;
      } else {
        const { data } = await axios.put(`/api/lineItems/${item.id}`, {
          quantity: item.quantity - 1,
        });
        dispatch(decreasedQuantity(data));
      }
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
    case INCREASE_QUANTITY:
      return state.map((item) =>
        item.bubbleTeaId === action.item.bubbleTeaId
          ? { ...item, quantity: action.item.quantity }
          : item
      );
    case DECREASE_QUANTITY:
      return state.map((item) =>
        item.bubbleTeaId === action.item.bubbleTeaId
          ? { ...item, quantity: action.item.quantity }
          : item
      );
    default:
      return state;
  }
}
