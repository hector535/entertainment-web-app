import { calculateRemainingTime } from "./utils";

export const retrieveTokenData = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  const userId = localStorage.getItem("id");
  const email = localStorage.getItem("email");
  const expirationTime = localStorage.getItem("expirationTime");
  const remainingTime = calculateRemainingTime(expirationTime);

  if (remainingTime <= 60000) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
  }

  return {
    token: token,
    id: userId,
    email,
    remainingTime: remainingTime,
  };
};
