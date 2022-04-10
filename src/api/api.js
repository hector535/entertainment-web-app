import actions from "../actions";
import { REQUEST_STATUS } from "../utils/constants";

export class API {
  constructor(dispatch) {
    this.dispatch = dispatch;
    this.apiKey = "AIzaSyBPPVWMy6_hvXB6jd-G6NlFAz5axsoMceM";
  }

  processRequest = async (url, reqData, reqName = null) => {
    this.dispatch(actions.ui.loading());

    try {
      const response = await fetch(url, {
        method: reqData.method,
        body: reqData.body ? JSON.stringify({ ...reqData.body }) : null,
        headers: reqData.headers
          ? {
              "Content-Type": "application/json",
            }
          : {},
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error.message || "Something went wrong");
      }

      this.dispatch(actions.ui.succeeded(reqName));

      return { status: REQUEST_STATUS.SUCCEEDED, data: data };
    } catch (error) {
      console.log(error);
      this.dispatch(actions.ui.failed());
      return { status: REQUEST_STATUS.FAILED, data: null };
    }
  };
}
