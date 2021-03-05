import newsFeedReducer from "./newsFeedReducer";
import { combineReducers } from "redux";

// access data through e.g. state.newsFeed.data
const rootReducer = combineReducers({
  newsFeed: newsFeedReducer,
});

export default rootReducer;
