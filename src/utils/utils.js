import { SIZE } from "./constants";

const getCurrentViewportDimension = () => {
  const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
  const vh = Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  );

  return {
    width: vw,
    height: vh,
  };
};

export const getCurrentViewportSize = () => {
  const dimensions = getCurrentViewportDimension();

  if (dimensions.width >= 1440) {
    return SIZE.LARGE;
  } else if (dimensions.width >= 768) {
    return SIZE.MEDIUM;
  } else {
    return SIZE.SMALL;
  }
};

export const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjTime = new Date(expirationTime).getTime();

  return adjTime - currentTime;
};

export const getReqDataObj = (method, body, headers) => {
  if (body) {
    return { method, body: { ...body }, headers };
  }
  return { method };
};

class TimerIdStorage {
  constructor(timerId) {
    let _timerId = timerId;

    this.getTimerId = () => {
      return _timerId;
    };

    this.setTimerId = (timerId) => {
      _timerId = timerId;
    };
  }
}

export const timerIdStorage = new TimerIdStorage();
