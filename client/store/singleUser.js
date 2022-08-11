import axios from "axios";

const GOT_USER = "GOT_USER";

const SET_USER = "SET_USER";
const GOT_USER_ORDERS = "GOT_USER_ORDERS";

const gotSingleUser = (user) => {
  return {
    type: GOT_USER,
    user,
  };
};

const gotUserOrders = (orders) => {
  return {
    type: GOT_USER_ORDERS,
    orders,
  };
};

export const _setUser = (user) => {
  return {
    type: SET_USER,
    user,
  };
};

export const getSingleUser = (id) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      const { data } = await axios.get(`/api/users/${id}`, {
        headers: {
          authorization: token,
        },
      });
      dispatch(gotSingleUser(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const getUserOrders = (userId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      const { data } = await axios.get(`/api/users/${userId}/orders`, {
        headers: {
          authorization: token,
        },
      });
      dispatch(gotUserOrders(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export default function userReducer(state = {}, action) {
  switch (action.type) {
    case GOT_USER:
      return action.user;
    case GOT_USER_ORDERS:
      return action.orders;
    case SET_USER:
      return action.user;
    default:
      return state;
  }
}
