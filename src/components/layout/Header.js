import React from "react";
import { useDispatch } from "react-redux";
import Navigation from "../navigation/Navigation";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import Avatar from "../../assets/image-avatar.png";
import { signoutHandler } from "../../actions/auth-se-actions";
import classes from "./Header.module.css";

const Header = (props) => {
  const dispatch = useDispatch();

  const onSignoutHandler = () => {
    dispatch(signoutHandler());
  };

  return (
    <header className={classes["header"]}>
      <Logo className={classes["logo"]} viewBox="0 0 32 25.6" />
      <Navigation />
      <div className={classes["avatar-logout"]}>
        <img className={classes["avatar"]} src={Avatar} alt="Avatar" />
        <div className={classes["logout"]}>
          <a href="#" onClick={onSignoutHandler}>
            Sign out
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
