import { ActionTypes } from "../utilities/authValues";

export const logIn = (email, password) => {
  return {
    event: "login",
    emit: true,
    handle: ActionTypes.AUTH_LOGIN,
    payload: { data: { email, password } }
  };
};

export const logOut = () => {
  return {
    type: ActionTypes.AUTH_LOGOUT
  };
};

export const error = error => {
  return {
    type: ActionTypes.AUTH_ERROR,
    payload: { error }
  };
};

export const signUp = (email, password) => {
  return {
    event: "signup",
    emit: true,
    handle: ActionTypes.AUTH_SIGNUP,
    payload: { data: { email, password } }
  };
};

export const getUser = () => {
  return {
    event: "getUser",
    emit: true,
    handle: ActionTypes.AUTH_GET_USER
  };
};

export const updateUser = fields => {
  return {
    event: "updateUser",
    emit: true,
    handle: ActionTypes.AUTH_UPDATE_USER,
    payload: { data: fields }
  };
};
