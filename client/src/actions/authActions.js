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
    type: ActionTypes.AUTH_UPDATE_USER,
    event: "updateUser",
    emit: true,
    handle: ActionTypes.AUTH_UPDATE_USER,
    payload: { data: fields }
  };
};
