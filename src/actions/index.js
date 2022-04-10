import * as uiActions from "./ui-actions.js";
import * as authActions from "./auth-actions";
import * as seriesMoviesActions from "./movies-series.actions";
import * as bookmarksActions from "./bookmarks-actions";
import * as componentActions from "./component-actions";

const actions = {
  ui: uiActions,
  auth: authActions,
  seriesMovies: seriesMoviesActions,
  bookmarks: bookmarksActions,
  component: componentActions,
};

export default actions;
