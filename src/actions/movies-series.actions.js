export const setMoviesSeries = (movieSeries) => {
  return { type: "SET_MOVIES_SERIES", payload: movieSeries };
};

export const removeMoviesSeries = () => {
  return { type: "REMOVE_MOVIES_SERIES" };
};
