import actions from ".";
import Bookmarks from "../api/bookmarks";
import { REQUEST_STATUS } from "../utils/constants";

export const addBookmark = (bookmark) => {
  return async (dispatch, getState) => {
    const { token, id } = getState().auth;
    const bookmarkApi = new Bookmarks(dispatch, token);

    const response = await bookmarkApi.addBookmark(id, bookmark);

    if (response.status === REQUEST_STATUS.SUCCEEDED) {
      dispatch(
        actions.bookmarks.addBookmark({
          id: response.data.name,
          ...bookmark,
        })
      );
    }
  };
};

export const removeBookmark = (bookmarkId) => {
  return async (dispatch, getState) => {
    const { token, id } = getState().auth;

    const bookmarkApi = new Bookmarks(dispatch, token);

    const response = await bookmarkApi.removeBookmark(id, bookmarkId);

    if (response.status === REQUEST_STATUS.SUCCEEDED) {
      dispatch(actions.bookmarks.removeBookmark(bookmarkId));
    }
  };
};
