import { getReqDataObj } from "../utils/utils";
import { API } from "./api";

class Bookmarks extends API {
  constructor(dispatch, token) {
    super(dispatch);
    this.token = token;
  }

  addBookmark = async (userId, bookmark) => {
    const response = await this.processRequest(
      `https://movie-series-web-default-rtdb.firebaseio.com/users/${userId}/bookmarks.json?auth=${this.token}`,
      getReqDataObj("POST", { ...bookmark }, true),
      "ADDBOOKMARK"
    );

    return response;
  };

  removeBookmark = async (userId, bookmarkId) => {
    const response = await this.processRequest(
      `https://movie-series-web-default-rtdb.firebaseio.com/users/${userId}/bookmarks/${bookmarkId}.json?auth=${this.token}`,
      getReqDataObj("DELETE"),
      "REMOVEBOOKMARK"
    );

    return response;
  };

  fetchBookmarks = async (userId) => {
    return await this.processRequest(
      `https://movie-series-web-default-rtdb.firebaseio.com/users/${userId}/bookmarks.json?auth=${this.token}`,
      getReqDataObj("GET")
    );
  };
}

export default Bookmarks;
