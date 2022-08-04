import axios from "axios";

const GOT_SINGLEBUBBLETEA = "GOT_SINGLEBUBBLETEA";
// const SENT_CART = "SENT_CART";

const gotSingleBubbleTea = (singleBubbleTea) => {
  return {
    type: GOT_SINGLEBUBBLETEA,
    singleBubbleTea,
  };
};

// const sentBubbleTeaToCart = (singleBubbleTea) => {
//   return {
//     type: SENT_CART,
//     singleBubbleTea,
//   };
// };

export const getSingleBubbleTea = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/bubbleTeas/${id}`);
      dispatch(gotSingleBubbleTea(data));
    } catch (err) {
      console.log(err);
    }
  };
};

// export const sendBubbleTeaToCart = (id) => {
//   return async (dispatch) => {
//     try {
//       const { data } = await axios.post(`/api/lineItems`, id);
//       dispatch(sentBubbleTeaToCart(data));
//     } catch (err) {
//       console.log(err);
//     }
//   };
// };

export default function bubbleTeaReducer(state = {}, action) {
  switch (action.type) {
    case GOT_SINGLEBUBBLETEA:
      return action.singleBubbleTea;

    default:
      return state;
  }
}
