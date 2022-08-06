import axios from "axios";

const GOT_USER = "GOT_USER";

// const SET_BUBBLETEA = "SET_BUBBLETEA";

const gotSingleUser = (user) => {
  return {
    type: GOT_USER,
    user,
  };
};

// export const _setBubbleTea = (singleBubbleTea) => {
//   return {
//     type: SET_BUBBLETEA,
//     singleBubbleTea,
//   };
// };

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

    // case SET_BUBBLETEA:
    //   return action.singleBubbleTea;
    default:
      return state;
  }
}
