import React from "react";
import { CATEGORY } from "../../utils/constants";
import Content from "../content/Content";

const SeriesPage = () => {
  return (
    <Content title="Series" placeholder="series" category={CATEGORY.SERIES} />
  );
};

export default SeriesPage;
