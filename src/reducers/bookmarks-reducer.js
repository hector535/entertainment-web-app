const initialState = {
  items: [],
};

const bookmarksReducer = (state = initialState, action) => {
  if (action.type === "SET_BOOKMARKS") {
    return { items: action.payload };
  }
  if (action.type === "ADD_BOOKMARK") {
    const updatedBookmarks = [...state.items];
    updatedBookmarks.push({ ...action.payload });
    return { items: updatedBookmarks };
  }
  if (action.type === "REMOVE_BOOKMARK") {
    return { items: state.items.filter((item) => item.id !== action.payload) };
  }
  return state;
};

export default bookmarksReducer;
