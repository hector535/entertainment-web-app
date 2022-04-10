import React, { Component } from "react";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import AuthForm from "../auth/AuthForm";
import classes from "./AuthPage.module.css";

class AuthPage extends Component {
  render = () => {
    return (
      <main className={classes["main"]}>
        <Logo className={classes["logo"]} viewBox="0 0 32 25.6" />
        <AuthForm />
      </main>
    );
  };
}

export default AuthPage;
