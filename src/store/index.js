import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import authReducer from "../reducers/auth-reducer";
import uiReducer from "../reducers/ui-reducer";
import moviesSeriesReducer from "../reducers/movies-series-reducer";
import bookmarksReducer from "../reducers/bookmarks-reducer";
import componentReducer from "../reducers/component-reducer";

const store = createStore(
  combineReducers({
    auth: authReducer,
    ui: uiReducer,
    moviesSeries: moviesSeriesReducer,
    bookmarks: bookmarksReducer,
    component: componentReducer,
  }),
  applyMiddleware(thunk)
);

export default store;
