import values from "../utilities/values";
import { ActionTypes } from "../utilities/authValues";

export const logIn = (email, password) => {
  return {
    type: ActionTypes.AUTH_LOGIN,
    payload: {
      request: {
        method: "post",
        url: `/${values.server.apiVersion}/users/login`,
        data: { email, password }
      }
    }
  };
};

export const logOut = () => {
  return {
    type: ActionTypes.AUTH_LOGOUT
  };
};

export const signUp = (email, password) => {
  return {
    type: ActionTypes.AUTH_SIGNUP,
    payload: {
      request: {
        method: "post",
        url: `/${values.server.apiVersion}/users/signup`,
        data: { email, password }
      }
    }
  };
};

export const getUser = () => {
  return {
    type: ActionTypes.AUTH_GET_USER,
    payload: {
      request: {
        method: "get",
        url: `/${values.server.apiVersion}/users`
      }
    }
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
