import axios from "axios";

const GOT_USERS = "GOT_USERS";
const DELETE_USER = "DELETE_USER";
const UPDATE_ADMIN_STATUS = "UPDATE_ADMIN_STATUS";
const UPDATE_USER = "UPDATE_USER";
const GUEST_USER = "GUEST_USER";

const gotUsers = (users) => {
  return {
    type: GOT_USERS,
    users,
  };
};

const deletedUser = (user) => {
  return {
    type: DELETE_USER,
    user,
  };
};

const updatedAdminStatus = (user) => {
  return {
    type: UPDATE_ADMIN_STATUS,
    user,
  };
};

const updatedUser = (user) => {
  return {
    type: UPDATE_USER,
    user,
  };
};

const createdGuest = (user) => {
  return {
    type: GUEST_USER,
    user,
  };
};

export const getUsers = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/users");
      dispatch(gotUsers(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteUser = (id, history) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`/api/users/${id}`);
      dispatch(deletedUser(data));
      history.push("/home");
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateAdminStatus = (user, history) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/users/${user.id}`, user);
      dispatch(updatedAdminStatus(data));
      history.push("/home");
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateUser = (user, history) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/users/${user.id}`, user);
      dispatch(updatedUser(data));
      history.push("/home");
    } catch (err) {
      console.log(err);
    }
  };
};
export const guestUser = (user) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/users/${user.id}`, user);
      dispatch(createdGuest(data));
      history.push("/home");
    } catch (err) {
      console.log(err);
    }
  };
};

export default function usersReducer(state = [], action) {
  switch (action.type) {
    case GOT_USERS:
      return action.users;
    case DELETE_USER:
      return state.filter((user) => user.id !== action.user.id);
    case UPDATE_ADMIN_STATUS:
      return state.map((user) =>
        user.id === action.user.id ? action.user : user
      );
    case UPDATE_USER:
      return state.map((user) =>
        user.id === action.user.id ? action.user : user
      );
    default:
      return state;
  }
}
