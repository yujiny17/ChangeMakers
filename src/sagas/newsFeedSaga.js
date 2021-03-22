import { put, takeLatest } from "redux-saga/effects";
import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
} from "../constants/constants";

// import Api from "../api";

async function fetchAsync(func) {
  const response = await func();
  if (response.ok) {
    return await response.json();
  }
  throw new Error("Unexpected error!!!");
}

// put does dispatch
function* fetchPostsAsync() {
  console.log("SAGA: fetchPostsAsync");
  try {
    // console.log("SAGA: fetchPosts", put({ type: FETCH_POSTS_REQUEST }));
    // const posts = yield fetchAsync(Api.getPosts);
    const posts = [testPost1, testPost2];
    // const posts = [testPost1];
    yield put({
      type: FETCH_POSTS_SUCCESS,
      data: posts,
    });
  } catch (e) {
    yield put({
      type: FETCH_POSTS_ERROR,
      error: e.message,
    });
  }
}

export function* newsFeedSaga() {
  console.log("SAGA: newsFeedSaga");
  yield takeLatest(FETCH_POSTS_REQUEST, fetchPostsAsync);
}

var testPost1 = {
  id: "01",
  userId: "01",
  title: "Rising Anti-Asian Violence in the US",
  content:
    "https://www.usatoday.com/story/news/nation/2021/02/12/asian-hate-incidents-covid-19-lunar-new-year/4447037001/",
  timestamp: "2020-3-2 11:27:50",
};

var testPost2 = {
  id: "02",
  userId: "01",
  title: "Tips for Talking About Mental Health",
  content: "1. Avoid being judgemental \n 2. Ask open-ended questions",
  timestamp: "2020-3-2 11:30:01",
};
