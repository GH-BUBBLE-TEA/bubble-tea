import axios from "axios";

const GOT_SINGLEBUBBLETEA = "GOT_SINGLEBUBBLETEA";

const gotSingleBubbleTea = (singleBubbleTea) => {
    return {
      type: GOT_SINGLEBUBBLETEA,
      singleBubbleTea,
    };
  };
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
  export default function bubbleTeaReducer(state = {}, action) {
    switch (action.type) {
      case GOT_SINGLEBUBBLETEA:
        return action.singleBubbleTea;
      default:
        return state;
    }
  }