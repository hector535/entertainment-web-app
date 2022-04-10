export const setUser = (userData) => {
  return { type: "SET_USER", payload: userData };
};

export const removeUser = () => {
  return { type: "REMOVE_USER" };
};
