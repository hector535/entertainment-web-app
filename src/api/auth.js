import { REQUEST_STATUS } from "../utils/constants";
import { getReqDataObj } from "../utils/utils";
import { API } from "./api";

class Auth extends API {
  signup = async (email, password) => {
    let storeUserRes = null;
    const signUpRes = await this.processRequest(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
        this.apiKey,
      getReqDataObj("POST", { email, password, returnSecureToken: false }, true)
    );

    if (signUpRes.status === REQUEST_STATUS.SUCCEEDED) {
      storeUserRes = await this.processRequest(
        `https://movie-series-web-default-rtdb.firebaseio.com/users/${signUpRes.data.localId}.json?auth=${signUpRes.data.idToken}`,
        getReqDataObj("POST", { email }, true),
        "SIGNUP"
      );
    }

    return storeUserRes;
  };

  signin = async (email, password) => {
    let getUserResponse = null;
    const signinResponse = await this.processRequest(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
        this.apiKey,
      getReqDataObj("POST", { email, password, returnSecureToken: true }, true)
    );

    if (signinResponse.status === REQUEST_STATUS.SUCCEEDED) {
      getUserResponse = await this.processRequest(
        `https://movie-series-web-default-rtdb.firebaseio.com/users/${signinResponse.data.localId}.json?auth=${signinResponse.data.idToken}`,
        getReqDataObj("GET"),
        "SIGNIN"
      );

      getUserResponse = Object.keys(getUserResponse.data).map((key) => {
        return { id: key, ...getUserResponse[key] };
      })[0];

      getUserResponse = {
        status: REQUEST_STATUS.SUCCEEDED,
        id: signinResponse.data.localId,
        token: signinResponse.data.idToken,
        email: email,
        expiresIn: signinResponse.data.expiresIn,
      };
    }

    return getUserResponse;
  };
}

export default Auth;
