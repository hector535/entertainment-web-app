import React from "react";
import { useSelector } from "react-redux";
import GenericListItem from "./GenericListItem";
import classes from "./GenericList.module.css";

const GenericList = (props) => {
  const genericListItemComponent = useSelector((state) => state.component);
  const { trendingList } = props;
  const listClass = `${classes["list"]} ${
    trendingList ? classes["list--white-space"] : classes["list--grid"]
  }`;
  let liStyle = null;

  if (props.isSearching || props.isBookmarkSection) {
    const containerWidth = props.containerWidth;
    const liWidth = genericListItemComponent.genericListItem.li.width;
    const itemsPerRow = Math.floor(containerWidth / +liWidth);

    if (props.items.length < itemsPerRow) {
      liStyle = {
        gridTemplateColumns: `repeat(auto-fit, ${liWidth}px)`,
      };
    }
  }

  const items = props.items.map((item) => (
    <GenericListItem
      key={item.title}
      item={item}
      isTrendingItem={trendingList}
      onBookmark={props.onBookmark}
      isBookmarkSection={props.isBookmarkSection}
    />
  ));
  return (
    <ul className={listClass} style={liStyle}>
      {items}
    </ul>
  );
};

export default GenericList;
