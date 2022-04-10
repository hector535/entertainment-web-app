const initialState = {
  token: null,
  id: null,
  email: null,
  isLoggedIn: false,
};

const authReducer = (state = initialState, action) => {
  if (action.type === "SET_USER") {
    const { token, id, email } = action.payload;
    const isLoggedIn = token ? true : false;
    return { token: token, id: id, email: email, isLoggedIn: isLoggedIn };
  }
  if (action.type === "REMOVE_USER") {
    return initialState;
  }

  return state;
};

export default authReducer;
