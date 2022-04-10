import React from "react";
import Header from "./Header";
import classes from "./Layout.module.css";

const Layout = (props) => {
  return (
    <div className={classes["wrapper"]}>
      <Header />
      <main className={classes["main"]}>{props.children}</main>
    </div>
  );
};

export default Layout;
