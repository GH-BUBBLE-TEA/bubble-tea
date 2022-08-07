import axios from "axios";

const GOT_USER = "GOT_USER";

const SET_USER = "SET_USER";

const gotSingleUser = (user) => {
  return {
    type: GOT_USER,
    user,
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
      const { data } = await axios.get(`/api/users/${id}`);
      dispatch(gotSingleUser(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export default function userReducer(state = {}, action) {
  switch (action.type) {
    case GOT_USER:
      return action.user;

    case SET_USER:
      return action.user;
    default:
      return state;
  }
}
