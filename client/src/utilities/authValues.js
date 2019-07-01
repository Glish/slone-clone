export const ActionTypes = {
  AUTH_LOADING: "slone/auth/LOADING",
  AUTH_LOGIN: "slone/auth/AUTH_LOGIN",
  AUTH_LOGIN_SUCCESS: "slone/auth/AUTH_LOGIN_SUCCESS",
  AUTH_LOGIN_FAIL: "slone/auth/AUTH_LOGIN_FAIL",
  AUTH_LOGOUT: "slone/auth/AUTH_LOGOUT",
  AUTH_SIGNUP: "slone/auth/AUTH_SIGNUP",
  AUTH_SIGNUP_SUCCESS: "slone/auth/AUTH_SIGNUP_SUCCESS",
  AUTH_SIGNUP_FAIL: "slone/auth/AUTH_SIGNUP_FAIL",
  AUTH_GET_USER: "slone/auth/AUTH_GET_USER",
  AUTH_GET_USER_SUCCESS: "slone/auth/AUTH_GET_USER_SUCCESS",
  AUTH_GET_USER_FAIL: "slone/auth/AUTH_GET_USER_FAIL",
  AUTH_UPDATE_USER: "slone/auth/AUTH_UPDATE_USER",
  AUTH_UPDATE_USER_SUCCESS: "slone/auth/AUTH_UPDATE_USER_SUCCESS",
  AUTH_ERROR: "slone/auth/AUTH_ERROR"
};

export const defaultState = {
  isLoggedIn: false,
  isLoading: false,
  error: false,
  token: localStorage.getItem("token"),
  user: undefined
};
