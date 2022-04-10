import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import actions from "../../actions";
import { ReactComponent as BookmarkIcon } from "../../assets/icon-bookmark-empty.svg";
import { ReactComponent as Play } from "../../assets/icon-play.svg";
import ItemDescription from "./ItemDescription";
import { getCurrentViewportSize } from "../../utils/utils";
import { REQUEST_STATUS, SIZE } from "../../utils/constants";
import sizeMe from "react-sizeme";
import classes from "./GenericListItem.module.css";

const GenericListItem = (props) => {
  const [disableBookmark, setDisableBookmark] = useState(false);
  const { from, status } = useSelector((state) => state.ui);
  const bookmarks = useSelector((state) => state.bookmarks);
  const dispatch = useDispatch();
  const { isTrendingItem, isBookmarkSection } = props;

  const { title, year, category, rating, thumbnail } = props.item;

  const sizeModifier = isTrendingItem ? classes["item--trending"] : null;
  const informationClass = isTrendingItem
    ? classes["information"]
    : classes["information--outside"];
  const itemClass = `${classes["item"]} ${sizeModifier}`;
  const currentViewportSize = getCurrentViewportSize();

  let insideContent = null;
  let outsideContent = null;
  let imageURL = null;
  let titleClass = null;
  let bookmarkIconClass =
    bookmarks.items.findIndex((b) => b.title === title) !== -1
      ? classes["bookmark--fill"]
      : null;

  let liStyle = {
    backgroundImage: "",
  };

  useEffect(() => {
    if (from === "ADDBOOKMARK" || from === "REMOVEBOOKMARK") {
      if (status === REQUEST_STATUS.SUCCEEDED) {
        setTimeout(() => {
          setDisableBookmark(false);
        }, 30000);
      } else {
        setDisableBookmark(false);
      }
    }
  }, [from, status]);

  const { width } = props.size;

  useEffect(() => {
    if (!isTrendingItem && !isBookmarkSection) {
      dispatch(actions.component.setLiWidth(width));
    }
  }, [width, isTrendingItem, isBookmarkSection, dispatch]);

  const bookmarkHandler = () => {
    props.onBookmark(props.item);
    setDisableBookmark(true);
  };

  if (isTrendingItem) {
    if (
      currentViewportSize === SIZE.SMALL ||
      currentViewportSize === SIZE.MEDIUM
    ) {
      imageURL = thumbnail.trending.small;
    } else {
      imageURL = thumbnail.trending.large;
    }

    imageURL = imageURL.substring(8);
    liStyle.backgroundImage = `url(${imageURL})`;
    titleClass = classes["title--trending"];
    insideContent = (
      <div className={informationClass}>
        <ItemDescription year={year} category={category} rating={rating} />
        <h2 className={titleClass}>{title}</h2>
      </div>
    );
  } else {
    if (currentViewportSize === SIZE.SMALL) {
      imageURL = thumbnail.regular.small;
    } else if (currentViewportSize === SIZE.MEDIUM) {
      imageURL = thumbnail.regular.medium;
    } else {
      imageURL = thumbnail.regular.large;
    }
    imageURL = imageURL.substring(8);
    liStyle.backgroundImage = `url(${imageURL})`;
    titleClass = classes["title"];
    outsideContent = (
      <div className={informationClass}>
        <ItemDescription year={year} category={category} rating={rating} />
        <h2 className={titleClass}>{title}</h2>
      </div>
    );
  }
  return (
    <li style={liStyle} className={itemClass}>
      <div className={classes["container"]}>
        {insideContent}
        <button
          className={classes["bookmark-container"]}
          onClick={bookmarkHandler}
          disabled={disableBookmark}
        >
          <span className={classes["bookmark"]}>
            <BookmarkIcon viewBox="0 0 12 14" className={bookmarkIconClass} />
          </span>
        </button>
        <div className={classes["play"]}>
          <Play viewBox="0 0 30 30" />
          <p>Play</p>
        </div>
      </div>
      {outsideContent}
    </li>
  );
};

export default sizeMe()(GenericListItem);
