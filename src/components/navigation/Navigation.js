import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { ReactComponent as HomeIcon } from "../../assets/icon-nav-home.svg";
import { ReactComponent as MoviesIcon } from "../../assets/icon-nav-movies.svg";
import { ReactComponent as SeriesIcon } from "../../assets/icon-nav-tv-series.svg";
import { ReactComponent as BookmarkIcon } from "../../assets/icon-nav-bookmark.svg";
import classes from "./Navigation.module.css";

const getIconClass = (currentPathName, linkPathName) => {
  return `${classes["icon"]} ${
    currentPathName === linkPathName ? classes["icon--active"] : ""
  }`;
};

class Navigation extends Component {
  homePath = "/home";
  moviesPath = "/movies";
  seriesPath = "/series";
  bookmarksPath = "/bookmarks";

  render = () => {
    return (
      <nav>
        <ul className={classes["list"]}>
          <li className={classes["item"]}>
            <Link to={this.homePath}>
              <HomeIcon
                viewBox="0 0 20 20"
                className={getIconClass(
                  this.props.location.pathname,
                  this.homePath
                )}
              />
            </Link>
          </li>
          <li className={classes["item"]}>
            <Link to={this.moviesPath}>
              <MoviesIcon
                viewBox="0 0 20 20"
                className={getIconClass(
                  this.props.location.pathname,
                  this.moviesPath
                )}
              />
            </Link>
          </li>
          <li className={classes["item"]}>
            <Link to={this.seriesPath}>
              <SeriesIcon
                viewBox="0 0 20 20"
                className={getIconClass(
                  this.props.location.pathname,
                  this.seriesPath
                )}
              />
            </Link>
          </li>
          <li className={classes["item"]}>
            <Link to={this.bookmarksPath}>
              <BookmarkIcon
                viewBox="0 0 17 20"
                className={getIconClass(
                  this.props.location.pathname,
                  this.bookmarksPath
                )}
              />
            </Link>
          </li>
        </ul>
      </nav>
    );
  };
}

export default withRouter(Navigation);
