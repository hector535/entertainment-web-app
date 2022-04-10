import React from "react";
import { ReactComponent as CategoryMovieIcon } from "../../assets/icon-category-movie.svg";
import { ReactComponent as CategoryTVIcon } from "../../assets/icon-category-tv.svg";
import { CATEGORY } from "../../utils/constants";
import classes from "./ItemDescription.module.css";

const ItemDescription = (props) => {
  const icon =
    props.category === CATEGORY.MOVIE ? (
      <CategoryMovieIcon viewBox="0 0 12 12" />
    ) : (
      <CategoryTVIcon viewBox="0 0 12 12" />
    );
  return (
    <div className={classes["description"]}>
      <span>{props.year}</span>
      <span>{"\u2022"}</span>
      <div className={classes["category"]}>
        {icon} <span>{props.category}</span>
      </div>
      <span>{"\u2022"}</span>
      <span>{props.rating}</span>
    </div>
  );
};

export default ItemDescription;
