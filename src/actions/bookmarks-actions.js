export const setBookmarks = (bookmarks) => {
  return { type: "SET_BOOKMARKS", payload: bookmarks };
};

export const addBookmark = (bookmark) => {
  return { type: "ADD_BOOKMARK", payload: bookmark };
};

export const removeBookmark = (bookmarkId) => {
  return { type: "REMOVE_BOOKMARK", payload: bookmarkId };
};
