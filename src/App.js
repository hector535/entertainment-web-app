import React, { Fragment } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "./components/layout/Layout";
import AuthPage from "./components/pages/AuthPage";
import HomePage from "./components/pages/HomePage";
import MoviesPage from "./components/pages/MoviesPage";
import SeriesPage from "./components/pages/SeriesPage";
import BookmarksPage from "./components/pages/BookmarksPage";
import "./App.css";

function App() {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <Fragment>
      {!isLoggedIn && (
        <Fragment>
          <Route path="/auth">
            <AuthPage />
          </Route>
          <Route path="*">
            <Redirect to="/auth" />
          </Route>
        </Fragment>
      )}
      {isLoggedIn && (
        <Layout>
          <Switch>
            <Route path="/home">
              <HomePage />
            </Route>
            <Route path="/movies">
              <MoviesPage />
            </Route>
            <Route path="/series">
              <SeriesPage />
            </Route>
            <Route path="/bookmarks">
              <BookmarksPage />
            </Route>
            <Route path="/" exact>
              <Redirect to="/home" />
            </Route>
            <Route path="*">
              <Redirect to="/home" />
            </Route>
          </Switch>
        </Layout>
      )}
    </Fragment>
  );
}

export default App;
