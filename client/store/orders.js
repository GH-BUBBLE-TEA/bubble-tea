import axios from "axios";
import { getCartInfo } from "./lineItems";

// const GOT_ORDERS = "GOT_ORDERS";
const GOT_ORDER = "GOT_ORDER";
const CHECKOUT_ORDER = "CHECKOUT_ORDER";
const GOT_ALL_ORDERS = "GOT_ORDERS";

// const gotOrders = (orders) => {
//   return {
//     type: GOT_ORDERS,
//     orders,
//   };
// };

const gotAllOrders = (orders) => {
  return {
    type: GOT_ALL_ORDERS,
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

//this should probably moved to users??
//api/users/userId/orders
// export const getOrders = (userId) => {
//   return async (dispatch) => {
//     try {
//       const token = window.localStorage.getItem("token");
//       const { data } = await axios.get(`/api/orders/${userId}`, {
//         headers: {
//           authorization: token,
//         },
//       });
//       dispatch(gotOrders(data));
//     } catch (err) {
//       console.log(err);
//     }
//   };
// };

export const getAllOrders = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      const { data } = await axios.get("/api/orders", {
        headers: {
          authorization: token,
        },
      });
      dispatch(gotAllOrders(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const getOrder = (orderId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      const { data } = await axios.get(`/api/orders/${orderId}`, {
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
export const checkout = (orderId) => {
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
    } catch (err) {
      console.log(err);
    }
  };
};

//TODO: add a admin put route that chagnes order status to paid to shipping

export default function ordersReducer(state = [], action) {
  switch (action.type) {
    // case GOT_ORDERS:
    //   return action.orders;
    case CHECKOUT_ORDER:
      return action.order;
    case GOT_ORDER:
      return action.order;
    case GOT_ALL_ORDERS:
      return action.orders;
    default:
      return state;
  }
}
