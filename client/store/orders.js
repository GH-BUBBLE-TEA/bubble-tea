import axios from "axios";

const GOT_ORDERS = "GOT_ORDERS";
// const CREATE_BUBBLETEA = "CREATE_BUBBLETEA";
// const UPDATE_BUBBLETEA = "UPDATE_BUBBLETEA";
// const DELETE_BUBBLETEA = "DELETE_BUBBLETEA";

const gotOrders = (orders) => {
  return {
    type: GOT_ORDERS,
    orders,
  };
};

// const createdBubbleTea = (bubbleTea) => {
//   return {
//     type: CREATE_BUBBLETEA,
//     bubbleTea,
//   };
// };
// const updatedBubbleTea = (singleBubbleTea) => {
//   return {
//     type: UPDATE_BUBBLETEA,
//     singleBubbleTea,
//   };
// };

// const deletedBubbletTea = (singleBubbleTea) => {
//   return {
//     type: DELETE_BUBBLETEA,
//     singleBubbleTea,
//   };
// };

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

// export const createBubbleTea = (bubbleTea, history) => {
//   return async (dispatch) => {
//     try {
//       const { data } = await axios.post("/api/bubbleTeas", bubbleTea);
//       dispatch(createdBubbleTea(data));
//       history.push("/menu");
//     } catch (err) {
//       console.log(err);
//     }
//   };
// };

// export const deleteBubbleTea = (id, history) => {
//   return async (dispatch) => {
//     try {
//       const { data } = await axios.delete(`/api/bubbleTeas/${id}`);
//       dispatch(deletedBubbletTea(data));
//       history.push("/menu");
//     } catch (err) {
//       console.log(err);
//     }
//   };
// };

// export const updateBubbleTea = (singleBubbleTea, history) => {
//   return async (dispatch) => {
//     try {
//       const { data } = await axios.put(
//         `/api/bubbleTeas/${singleBubbleTea.id}`,
//         singleBubbleTea
//       );
//       dispatch(updatedBubbleTea(data));
//       history.push(`/menu/${singleBubbleTea.id}`);
//     } catch (err) {
//       console.log(err);
//     }
//   };
// };

export default function ordersReducer(state = [], action) {
  switch (action.type) {
    case GOT_ORDERS:
      return action.orders;
    // case CREATE_BUBBLETEA:
    //   return [...state, action.bubbleTea];
    // case UPDATE_BUBBLETEA:
    //   return state.map((singleBubbleTea) =>
    //     singleBubbleTea.id === action.singleBubbleTea.id
    //       ? action.singleBubbleTea
    //       : singleBubbleTea
    //   );
    // case DELETE_BUBBLETEA:
    //   return state.filter(
    //     (singleBubbleTea) => singleBubbleTea.id !== action.singleBubbleTea.id
    //   );
    default:
      return state;
  }
}
