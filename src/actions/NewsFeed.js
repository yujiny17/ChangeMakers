import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
} from "../constants/constants";

// export const fetchPosts = () => (dispatch) => {
export const fetchPosts = () => {
  console.log("ACTIONS: FETCH_POSTS_REQUEST");
  return {
    type: FETCH_POSTS_REQUEST,
    data: [],
  };
};
