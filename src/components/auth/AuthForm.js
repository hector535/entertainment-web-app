import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import actions from "../../actions";
import { signinHandler, signupHandler } from "../../actions/auth-se-actions";
import { REQUEST_STATUS } from "../../utils/constants";
import classes from "./AuthForm.module.css";

const isNotEmpty = (value) => value.trim().length > 0;

const emailRegex = (email) => {
  const emailRegex = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  return emailRegex.test(email);
};

const passwordRegex = (password) => {
  var strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  return strongRegex.test(password);
};

class AuthForm extends Component {
  state = {
    isLogin: true,
    email: {
      value: "",
      isTouched: false,
    },
    password: {
      value: "",
      isTouched: false,
    },
    repeatPassword: {
      value: "",
      isTouched: false,
    },
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { isLoggedIn } = this.props.auth;
    const { history, setRequestStatus } = this.props;
    const { status, from } = this.props.ui;

    if (isLoggedIn) {
      history.replace("/home");
    }

    if (status === REQUEST_STATUS.SUCCEEDED && from === "SIGNUP") {
      setRequestStatus(actions.ui.idle());
      this.setState({
        isLogin: true,
        email: { value: "", isTouched: false },
        password: { value: "", isTouched: false },
        repeatPassword: { value: "", isTouched: false },
      });
    }
  };

  toggleModeHandler = () => {
    this.setState((prevState) => {
      return {
        isLogin: !prevState.isLogin,
        email: { value: "", isTouched: false },
        password: { value: "", isTouched: false },
        repeatPassword: { value: "", isTouched: false },
      };
    });
  };

  onChangeEmailHandler = (event) => {
    this.setState((prevState) => {
      return { email: { ...prevState.email, value: event.target.value } };
    });
  };

  onBlurEmailHandler = (event) => {
    this.setState((prevState) => {
      return { email: { ...prevState.email, isTouched: true } };
    });
  };

  onChangePasswordHandler = (event) => {
    this.setState((prevState) => {
      return { password: { ...prevState.password, value: event.target.value } };
    });
  };

  onBlurPasswordHandler = (event) => {
    this.setState((prevState) => {
      return { password: { ...prevState.password, isTouched: true } };
    });
  };

  onChangeRepeatPasswordHandler = (event) => {
    this.setState((prevState) => {
      return {
        repeatPassword: {
          ...prevState.repeatPassword,
          value: event.target.value,
        },
      };
    });
  };

  onBlurRepeatPasswordHandler = (event) => {
    this.setState((prevState) => {
      return {
        repeatPassword: { ...prevState.repeatPassword, isTouched: true },
      };
    });
  };

  checkEmailValidity = (email) => {
    if (!isNotEmpty(email)) {
      return { isValid: false, message: "Email field can't be empty" };
    } else if (!emailRegex(email)) {
      return { isValid: false, message: "Email is invalid" };
    }

    return { isValid: true, message: "" };
  };

  checkPasswordValidity = (password) => {
    if (!isNotEmpty(password)) {
      return { isValid: false, message: "Password field can't be empty" };
    } else if (!passwordRegex(password)) {
      return {
        isValid: false,
        message:
          "Password must have a lowercase, uppercase, number and special character",
      };
    }
    return { isValid: true, message: "" };
  };

  checkRepeatPasswordValidity = (repeatedPassword, password) => {
    if (!isNotEmpty(repeatedPassword)) {
      return {
        isValid: false,
        message: "Repeat Password field can't be empty",
      };
    } else if (repeatedPassword !== password) {
      return {
        isValid: false,
        message: "Repeat Password doesn't match the password",
      };
    }
    return { isValid: true, message: "" };
  };

  render = () => {
    const { isLogin, email, password, repeatPassword } = this.state;
    const { status } = this.props.ui;

    const emailValidity = this.checkEmailValidity(email.value);
    const passwordValidity = this.checkPasswordValidity(password.value);
    const repeatPasswordValidity = this.checkRepeatPasswordValidity(
      repeatPassword.value,
      password.value
    );

    const isEmailFieldInvalid = email.isTouched && !emailValidity.isValid;
    const isPasswordFieldInvalid =
      password.isTouched && !passwordValidity.isValid;
    const isRepeatPasswordFieldInvalid =
      repeatPassword.isTouched && !repeatPasswordValidity.isValid;

    let isFormValid = false;
    let submitButtonText = isLogin
      ? "Login to your account"
      : "Create an account";

    if (status === REQUEST_STATUS.LOADING) {
      submitButtonText = "Sending request...";
    }

    if (isLogin) {
      isFormValid = emailValidity.isValid && passwordValidity.isValid;
    } else {
      isFormValid =
        emailValidity.isValid &&
        passwordValidity.isValid &&
        repeatPasswordValidity.isValid;
    }

    const submitHandler = (event) => {
      event.preventDefault();

      this.setState((prevState) => {
        return { email: { ...prevState.email, isTouched: true } };
      });
      this.setState((prevState) => {
        return { password: { ...prevState.password, isTouched: true } };
      });
      this.setState((prevState) => {
        return {
          repeatPassword: { ...prevState.repeatPassword, isTouched: true },
        };
      });

      if (!isFormValid) {
        return;
      }

      if (isLogin) {
        this.props.signin(this.state.email.value, this.state.password.value);
      } else {
        this.props.signup(this.state.email.value, this.state.password.value);
      }
    };

    return (
      <section className={classes["auth"]}>
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        <form onSubmit={submitHandler}>
          <input
            type="email"
            placeholder="Email address"
            className={isEmailFieldInvalid ? classes["invalid"] : null}
            value={email.value}
            onChange={this.onChangeEmailHandler}
            onBlur={this.onBlurEmailHandler}
          />
          {isEmailFieldInvalid && <p>{emailValidity.message}</p>}
          <input
            type="password"
            placeholder="Password"
            className={isPasswordFieldInvalid ? classes["invalid"] : null}
            value={password.value}
            onChange={this.onChangePasswordHandler}
            onBlur={this.onBlurPasswordHandler}
          />
          {isPasswordFieldInvalid && <p>{passwordValidity.message}</p>}
          {!isLogin && (
            <Fragment>
              <input
                type="password"
                placeholder="Repeat Password"
                className={
                  isRepeatPasswordFieldInvalid ? classes["invalid"] : null
                }
                value={repeatPassword.value}
                onChange={this.onChangeRepeatPasswordHandler}
                onBlur={this.onBlurRepeatPasswordHandler}
              />
              {isRepeatPasswordFieldInvalid && (
                <p>{repeatPasswordValidity.message}</p>
              )}
            </Fragment>
          )}

          <div className={classes["actions"]}>
            <button
              className={classes["submit"]}
              disabled={status === REQUEST_STATUS.LOADING}
            >
              {submitButtonText}
            </button>
            <p>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </p>
            <button
              type="button"
              className={classes["toggle"]}
              onClick={this.toggleModeHandler}
            >
              {isLogin ? "Sign up" : "Login"}
            </button>
          </div>
        </form>
      </section>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    ui: state.ui,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signin: (email, password) => dispatch(signinHandler(email, password)),
    signup: (email, password) => dispatch(signupHandler(email, password)),
    setRequestStatus: (requestStatus) => dispatch(requestStatus),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AuthForm));
