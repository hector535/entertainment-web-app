const initialState = {
  genericListItem: {
    li: {
      width: 0,
    },
  },
};

const componentReducer = (state = initialState, action) => {
  if (action.type === "SET_LI_WIDTH") {
    return { genericListItem: { li: { width: action.payload } } };
  }
  return state;
};

export default componentReducer;
