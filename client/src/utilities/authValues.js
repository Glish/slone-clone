export const ActionTypes = {
  AUTH_LOGIN: "slone/auth/AUTH_LOGIN",
  AUTH_LOGIN_SUCCESS: "slone/auth/AUTH_LOGIN_SUCCESS",
  AUTH_LOGIN_FAIL: "slone/auth/AUTH_LOGIN_FAIL",
  AUTH_LOGOUT: "slone/auth/AUTH_LOGOUT",
  AUTH_GET_USER: "slone/auth/AUTH_GET_USER",
  AUTH_GET_USER_SUCCESS: "slone/auth/AUTH_GET_USER_SUCCESS",
  AUTH_GET_USER_FAIL: "slone/auth/AUTH_GET_USER_FAIL",
  AUTH_UPDATE_USER: "slone/auth/AUTH_UPDATE_USER"
};

export const defaultState = {
  isLoggedIn: false,
  isLoading: true,
  error: false,
  token: localStorage.getItem("token"),
  user: undefined
};
