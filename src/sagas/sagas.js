import { takeEvery, takeLatest, all } from "redux-saga/effects";
import { newsFeedSaga } from "./newsFeedSaga";

import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
} from "../constants/constants";

// takeEvery listens to every redux dispatches
// takeLatest listens to only latest dispatch
function* rootSaga() {
  console.log("SAGA: rootSaga");
  yield all([newsFeedSaga()]);
}

export default rootSaga;
