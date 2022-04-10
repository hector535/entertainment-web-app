import React from "react";
import Content from "../content/Content";

const HomePage = () => {
  return (
    <Content
      title="Recommended for you"
      placeholder="movies or TV series"
      hasTrendingSection
    />
  );
};

export default HomePage;
