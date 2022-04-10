import { REQUEST_STATUS } from "../utils/constants";

const initialState = {
  from: null,
  status: REQUEST_STATUS.IDLE,
  error: null,
};

const uiReducer = (state = initialState, action) => {
  if (action.type === "IDLE") {
    return initialState;
  }
  if (action.type === "LOADING") {
    return { ...state, from: null, status: REQUEST_STATUS.LOADING };
  }
  if (action.type === "SUCCEEDED") {
    return { ...state, from: action.payload, status: REQUEST_STATUS.SUCCEEDED };
  }
  if (action.type === "FAILED") {
    return { from: null, status: REQUEST_STATUS.FAILED, error: action.payload };
  }

  return state;
};

export default uiReducer;
