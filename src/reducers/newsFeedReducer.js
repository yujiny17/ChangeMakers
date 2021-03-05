import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
} from "../constants/constants";

// Initial State
const initialState = {
  data: [],
  loading: false,
  error: "",
};

export default function newsFeedReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS_REQUEST: {
      console.log("REDUCER: FETCH_POSTS_REQUEST");
      return {
        ...state,
        loading: true,
        error: "",
      };
    }
    case FETCH_POSTS_SUCCESS: {
      console.log("REDUCER: FETCH_POSTS_SUCCESS");
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    }
    case FETCH_POSTS_ERROR: {
      console.log("REDUCER: FETCH_POSTS_ERROR");
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    default: {
      return state;
    }
  }
}
