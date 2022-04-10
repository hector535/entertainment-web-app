import React from "react";
import { ReactComponent as SearchIcon } from "../../assets/icon-search.svg";
import classes from "./Searcher.module.css";

const Searcher = (props) => {
  const { placeholder } = props;
  return (
    <div className={classes["search-controls"]}>
      <label htmlFor="search">
        <SearchIcon className={classes["icon"]} viewBox="0 0 32 32" />
      </label>
      <input
        id="search"
        className={classes["search-field"]}
        type="text"
        placeholder={placeholder}
        onChange={(event) => props.onChange(event.target.value)}
      />
    </div>
  );
};

export default Searcher;
