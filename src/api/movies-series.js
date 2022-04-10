import { getReqDataObj } from "../utils/utils";
import { API } from "./api";

class MoviesSeries extends API {
  constructor(dispatch, token) {
    super(dispatch);
    this.token = token;
  }

  fetchMoviesSeries = async () => {
    const response = await this.processRequest(
      `https://movie-series-web-default-rtdb.firebaseio.com/movie-series.json?auth=${this.token}`,
      getReqDataObj("GET")
    );

    return response;
  };
}

export default MoviesSeries;
