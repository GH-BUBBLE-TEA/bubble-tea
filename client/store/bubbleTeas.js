import axios from "axios";

const GOT_BUBBLETEAS = "GOT_BUBBLETEAS";

export const gotBubbleTeas = (bubbleTeas) => {
  return {
    type: GOT_BUBBLETEAS,
    bubbleTeas,
  };
};

export const getBubbleTeas = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/bubbleTeas");
      dispatch(gotBubbleTeas(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export default function bubbleTeasReducer(state = [], action) {
  switch (action.type) {
    case GOT_BUBBLETEAS:
      return action.bubbleTeas;
    default:
      return state;
  }
}
