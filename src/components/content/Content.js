import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Searcher from "../searcher/Searcher";
import GenericList from "../generic-list/GenericList";
import { fetchMoviesSeries } from "../../actions/movies-series-se-actions";
import {
  addBookmark,
  removeBookmark,
} from "../../actions/bookmarks-se-actions";
import sizeMe from "react-sizeme";
import classes from "./Content.module.css";

class Content extends Component {
  state = {
    searchValue: "",
    items: [],
  };

  componentDidMount = () => {
    const { items } = this.props.moviesSeries;

    if (items.length === 0) {
      this.props.fetchItems();
    }
  };

  searcherHandler = (value) => {
    this.setState({ searchValue: value });
  };

  bookmarkHandler = (item) => {
    const itemIndex = this.props.bookmarks.items.findIndex(
      (it) => it.title === item.title
    );

    if (itemIndex !== -1) {
      this.props.removeBookmark(this.props.bookmarks.items[itemIndex].id);
    } else {
      this.props.addBookmark({ ...item });
    }
  };

  render = () => {
    let items = this.props.moviesSeries.items;
    let categorizedItems = null;
    let searchContent = null;
    let trendingContent = null;
    let content = null;
    let isBookmarkSection = false;

    if (!this.props.category && !this.props.onlyBookmarks) {
      categorizedItems = items;
    } else if (!this.props.category && this.props.onlyBookmarks) {
      categorizedItems = this.props.bookmarks.items;
      isBookmarkSection = true;
    } else {
      categorizedItems = items.filter(
        (item) => item.category === this.props.category
      );
    }

    if (this.state.searchValue.length > 0) {
      const searchValue = this.state.searchValue.toLowerCase();
      const filteredItems = categorizedItems.filter((item) =>
        item.title.toLowerCase().includes(searchValue)
      );
      searchContent = (
        <Fragment>
          <h2 className={classes["title"]}>
            Found {filteredItems.length} results for '{this.state.searchValue}'
          </h2>

          <GenericList
            items={filteredItems}
            onBookmark={this.bookmarkHandler}
            isSearching
            containerWidth={this.props.size.width}
          />
        </Fragment>
      );
    } else {
      if (this.props.hasTrendingSection) {
        const items = categorizedItems.filter((i) => i.isTrending);
        trendingContent = (
          <Fragment>
            <h2 className={classes["title"]}>Trending</h2>
            <GenericList
              items={items}
              trendingList
              onBookmark={this.bookmarkHandler}
            />
          </Fragment>
        );
      }

      content = (
        <Fragment>
          <h2 className={classes["title"]}>{this.props.title}</h2>
          <GenericList
            items={categorizedItems}
            onBookmark={this.bookmarkHandler}
            containerWidth={this.props.size.width}
            isBookmarkSection={isBookmarkSection}
          />
        </Fragment>
      );
    }
    return (
      <Fragment>
        <Searcher
          placeholder={`"Search for ${this.props.placeholder}"`}
          onChange={this.searcherHandler}
        />
        {searchContent}
        {trendingContent}
        {content}
      </Fragment>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    ui: state.ui,
    moviesSeries: state.moviesSeries,
    bookmarks: state.bookmarks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchItems: () => {
      dispatch(fetchMoviesSeries());
    },
    addBookmark: (bookmark) => {
      dispatch(addBookmark(bookmark));
    },
    removeBookmark: (bookmarkId) => {
      dispatch(removeBookmark(bookmarkId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(sizeMe()(Content));
