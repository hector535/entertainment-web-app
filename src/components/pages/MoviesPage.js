import React from "react";
import Content from "../content/Content";
import { CATEGORY } from "../../utils/constants";

const MoviesPage = () => {
  return (
    <Content title="Movies" placeholder="movies" category={CATEGORY.MOVIE} />
  );
};

export default MoviesPage;
