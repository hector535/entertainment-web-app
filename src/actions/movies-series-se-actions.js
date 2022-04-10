import actions from ".";
import MoviesSeries from "../api/movies-series";
import Bookmark from "../api/bookmarks";
import { REQUEST_STATUS } from "../utils/constants";

export const fetchMoviesSeries = () => {
  return async (dispatch, getState) => {
    const { auth } = getState();
    const token = auth.token;

    const moviesSeriesApi = new MoviesSeries(dispatch, token);
    const bookmarkApi = new Bookmark(dispatch, token);

    const responseMoviesSeries = await moviesSeriesApi.fetchMoviesSeries();
    const responseBookmarks = await bookmarkApi.fetchBookmarks(auth.id);

    if (responseMoviesSeries.status === REQUEST_STATUS.SUCCEEDED) {
      dispatch(actions.seriesMovies.setMoviesSeries(responseMoviesSeries.data));
    }

    if (responseBookmarks.status === REQUEST_STATUS.SUCCEEDED) {
      if (responseBookmarks.data) {
        const bookmarks = Object.keys(responseBookmarks.data).map((key) => {
          return { id: key, ...responseBookmarks.data[key] };
        });

        dispatch(actions.bookmarks.setBookmarks(bookmarks));
      }
    }
  };
};
