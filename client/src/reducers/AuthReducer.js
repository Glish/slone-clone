import * as R from "ramda";
import { createReducer } from "redux-create-reducer";
import { ActionTypes, defaultState } from "../utilities/authValues";

const authReducer = createReducer(defaultState, {
  [ActionTypes.AUTH_LOGIN](state, action) {
    return R.merge(state, {
      isLoading: true,
      error: false
    });
  },
  [ActionTypes.AUTH_LOGIN_SUCCESS](state, action) {
    localStorage.setItem("token", action.data.token);

    return R.mergeDeepRight(state, {
      isLoading: false,
      isLoggedIn: true,
      error: false,
      user: action.data.user
    });
  },
  [ActionTypes.AUTH_SIGNUP](state, action) {
    return R.merge(state, {
      isLoading: true,
      error: false
    });
  },
  [ActionTypes.AUTH_SIGNUP_SUCCESS](state, action) {
    localStorage.setItem("token", action.data.token);

    return R.mergeDeepRight(state, {
      isLoading: false,
      isLoggedIn: true,
      error: false,
      user: action.data.user
    });
  },
  [ActionTypes.AUTH_SIGNUP_FAIL](state, action) {
    return R.merge(state, {
      isLoading: false,
      isLoggedIn: false,
      error: true
    });
  },
  [ActionTypes.AUTH_GET_USER](state, action) {
    return R.mergeDeepRight(state, {
      isLoading: true,
      error: false
    });
  },
  [ActionTypes.AUTH_GET_USER_SUCCESS](state, action) {
    return R.mergeDeepRight(state, {
      isLoading: false,
      isLoggedIn: true,
      user: action.data.user
    });
  },
  [ActionTypes.AUTH_UPDATE_USER](state, action) {
    return R.mergeDeepRight(state, {
      isLoading: true
    });
  },
  [ActionTypes.AUTH_UPDATE_USER_SUCCESS](state, action) {
    return R.mergeDeepRight(state, {
      isLoading: false,
      user: action.data.user
    });
  },
  [ActionTypes.AUTH_LOGOUT]: () => {
    localStorage.removeItem("token");
    return R.always(defaultState);
  }
});

export default authReducer;
