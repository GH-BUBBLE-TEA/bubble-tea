import axios from "axios";

const GOT_BUBBLETEAS = "GOT_BUBBLETEAS";
const CREATE_BUBBLETEA = "CREATE_BUBBLETEA";
const UPDATE_BUBBLETEA = "UPDATE_BUBBLETEA";
const DELETE_BUBBLETEA = "DELETE_BUBBLETEA";
const UPDATE_STOCK = "UPDATE_STOCK";

const gotBubbleTeas = (bubbleTeas) => {
  return {
    type: GOT_BUBBLETEAS,
    bubbleTeas,
  };
};

const createdBubbleTea = (bubbleTea) => {
  return {
    type: CREATE_BUBBLETEA,
    bubbleTea,
  };
};
const updatedBubbleTea = (singleBubbleTea) => {
  return {
    type: UPDATE_BUBBLETEA,
    singleBubbleTea,
  };
};

const deletedBubbleTea = (singleBubbleTea) => {
  return {
    type: DELETE_BUBBLETEA,
    singleBubbleTea,
  };
};

const updatedBubbleTeaStock = (item) => {
  return {
    type: UPDATE_STOCK,
    item,
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

export const createBubbleTea = (bubbleTea, history) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      const { data } = await axios.post("/api/bubbleTeas", bubbleTea, {
        headers: {
          authorization: token,
        },
      });
      dispatch(createdBubbleTea(data));
      history.push("/menu");
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteBubbleTea = (id, history) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      const { data } = await axios.delete(`/api/bubbleTeas/${id}`, {
        headers: {
          authorization: token,
        },
      });
      dispatch(deletedBubbleTea(data));
      history.push("/menu");
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateBubbleTea = (singleBubbleTea, history) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      const { data } = await axios.put(
        `/api/bubbleTeas/${singleBubbleTea.id}`,
        singleBubbleTea,
        {
          headers: {
            authorization: token,
          },
        }
      );
      dispatch(updatedBubbleTea(data));
      history.push(`/menu/${singleBubbleTea.id}`);
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateStock = (cart) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      const cartItems = cart.map(async (bubbleTea) => {
        const { data: singleBubbleTea } = await axios.get(
          `/api/bubbleTeas/${bubbleTea.bubbleTeaId}`
        );
        const stockLevel = singleBubbleTea.stock;
        const { data } = await axios.put(
          `/api/bubbleTeas/${bubbleTea.bubbleTeaId}`,
          {
            stock: stockLevel - bubbleTea.quantity,
          },
          {
            headers: {
              authorization: token,
            },
          }
        );
        return dispatch(updatedBubbleTea(data));
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export default function bubbleTeasReducer(state = [], action) {
  switch (action.type) {
    case GOT_BUBBLETEAS:
      return action.bubbleTeas;
    case CREATE_BUBBLETEA:
      return [...state, action.bubbleTea];
    case UPDATE_BUBBLETEA:
      return state.map((singleBubbleTea) =>
        singleBubbleTea.id === action.singleBubbleTea.id
          ? action.singleBubbleTea
          : singleBubbleTea
      );
    case DELETE_BUBBLETEA:
      return state.filter(
        (singleBubbleTea) => singleBubbleTea.id !== action.singleBubbleTea.id
      );
    default:
      return state;
  }
}
