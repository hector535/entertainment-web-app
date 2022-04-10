const initialState = {
  items: [],
};

const moviesSeriesReducer = (state = initialState, action) => {
  if (action.type === "SET_MOVIES_SERIES") {
    return { items: action.payload };
  }
  if (action.type === "REMOVE_MOVIES_SERIES") {
    return initialState;
  }

  return state;
};

export default moviesSeriesReducer;
