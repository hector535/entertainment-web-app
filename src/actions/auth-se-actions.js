import Auth from "../api/auth";
import actions from "../actions";
import { calculateRemainingTime, timerIdStorage } from "../utils/utils";
import { REQUEST_STATUS } from "../utils/constants";

export const signinHandler = (email, password) => {
  return async (dispatch) => {
    const authApi = new Auth(dispatch);
    const data = await authApi.signin(email, password);

    if (data && data.status === REQUEST_STATUS.SUCCEEDED) {
      const expirationTimeMs = new Date().getTime() + +data.expiresIn * 1000;
      const expirationTime = new Date(expirationTimeMs).toISOString();
      const remainingTime = calculateRemainingTime(expirationTime);

      localStorage.setItem("token", data.token);
      localStorage.setItem("id", data.id);
      localStorage.setItem("email", data.email);
      localStorage.setItem("expirationTime", expirationTime);

      const timerId = setTimeout(signoutHandler, remainingTime);
      timerIdStorage.setTimerId(timerId);

      dispatch(
        actions.auth.setUser({
          token: data.token,
          id: data.id,
          email: data.email,
        })
      );
    }
  };
};

export const signupHandler = (email, password) => {
  return async (dispatch) => {
    const authApi = new Auth(dispatch);
    authApi.signup(email, password);
  };
};

export const signoutHandler = () => {
  return (dispatch) => {
    dispatch(actions.auth.removeUser());
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("email");
    localStorage.removeItem("expirationTime");

    const timerId = timerIdStorage.getTimerId();
    clearTimeout(timerId);
  };
};
