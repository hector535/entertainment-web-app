import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import store from "./store/";
import { signoutHandler } from "./actions/auth-se-actions";
import { retrieveTokenData } from "./utils/localStorage";
import { timerIdStorage } from "./utils/utils";
import actions from "./actions";

let tokenData = retrieveTokenData();
if (tokenData) {
  const timerId = setTimeout(() => {
    store.dispatch(signoutHandler());
  }, tokenData.remainingTime);

  timerIdStorage.setTimerId(timerId);

  store.dispatch(
    actions.auth.setUser({
      token: tokenData.token,
      id: tokenData.id,
      email: tokenData.email,
    })
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
