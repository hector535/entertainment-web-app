import React, { Component } from "react";
import Content from "../content/Content";

class BookmarksPage extends Component {
  render = () => {
    return <Content title="Bookmarks" placeholder="bookmarks" onlyBookmarks />;
  };
}

export default BookmarksPage;
