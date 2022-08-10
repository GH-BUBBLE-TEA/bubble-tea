import axios from "axios";
import { getCartInfo } from "./lineItems";

const GOT_ORDERS = "GOT_ORDERS";
const GOT_ORDER = "GOT_ORDER";
const CHECKOUT_ORDER = "CHECKOUT_ORDER";

const gotOrders = (orders) => {
  return {
    type: GOT_ORDERS,
    orders,
  };
};

const gotOrder = (order) => {
  return {
    type: GOT_ORDER,
    order,
  };
};
const checkedOut = (order) => {
  return {
    type: CHECKOUT_ORDER,
    order,
  };
};

export const getOrders = (userId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      const { data } = await axios.get(`/api/orders/${userId}`, {
        headers: {
          authorization: token,
        },
      });
      dispatch(gotOrders(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const getOrder = (userId, orderId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      const { data } = await axios.get(`/api/orders/${userId}/${orderId}`, {
        headers: {
          authorization: token,
        },
      });
      dispatch(gotOrder(data));
    } catch (err) {
      console.log(err);
    }
  };
};
export const checkout = (orderId, history) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      const { data } = await axios.put(
        `/api/orders/${orderId}`,
        { status: "Ordered" },
        {
          headers: {
            authorization: token,
          },
        }
      );
      dispatch(checkedOut(data));
      dispatch(getCartInfo());
      history.push("/cart");
    } catch (err) {
      console.log(err);
    }
  };
};

//TODO: add a admin put route that chagnes order status to paid to shipping

export default function ordersReducer(state = [], action) {
  switch (action.type) {
    case GOT_ORDERS:
      return action.orders;
    case CHECKOUT_ORDER:
      return action.order;
    case GOT_ORDER:
      return action.order;

    default:
      return state;
  }
}
