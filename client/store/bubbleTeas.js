import axios from "axios";

const GOT_BUBBLETEAS = "GOT_BUBBLETEAS";

const gotBubbleTeas = (bubbleTeas) => ({
  type: GOT_BUBBLETEAS,
  bubbleTeas,
});

export const getBubbleTeas = () => {
  return async (dispatch) => {
    try {
      const { data: bubbleTeas } = await axios.get("/api/bubbleTeas");
      dispatch(gotBubbleTeas(bubbleTeas));
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
