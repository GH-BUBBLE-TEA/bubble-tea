import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import bubbleTeasReducer from "./bubbleTeas";
import bubbleTeaReducer from "./singleBubbleTea";
import cartReducer from "./lineItems";

const reducer = combineReducers({
  auth,
  bubbleTeas: bubbleTeasReducer,
  singleBubbleTea: bubbleTeaReducer,
  cart: cartReducer,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
