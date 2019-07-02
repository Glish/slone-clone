import * as actions from "../authActions";
import { ActionTypes } from "../../utilities/authValues";

describe("auth actions", () => {
  it("should create an action to login", () => {
    const email = "test@email.com";
    const password = "password";

    const expectedAction = {
      event: "login",
      emit: true,
      handle: ActionTypes.AUTH_LOGIN,
      payload: { data: { email, password } }
    };

    expect(actions.logIn(email, password)).toEqual(expectedAction);
  });

  it("should create an action to logout", () => {
    const expectedAction = {
      type: ActionTypes.AUTH_LOGOUT
    };

    expect(actions.logOut()).toEqual(expectedAction);
  });

  it("should create an error action", () => {
    const error = "error";

    const expectedAction = {
      type: ActionTypes.AUTH_ERROR,
      payload: { error }
    };

    expect(actions.error(error)).toEqual(expectedAction);
  });

  it("should create a signup action", () => {
    const email = "test@email.com";
    const password = "password";

    const expectedAction = {
      event: "signup",
      emit: true,
      handle: ActionTypes.AUTH_SIGNUP,
      payload: { data: { email, password } }
    };

    expect(actions.signUp(email, password)).toEqual(expectedAction);
  });

  it("should create a getUser action", () => {
    const expectedAction = {
      event: "getUser",
      emit: true,
      handle: ActionTypes.AUTH_GET_USER
    };

    expect(actions.getUser()).toEqual(expectedAction);
  });

  it("should create a updateUser action", () => {
    const fields = {};

    const expectedAction = {
      event: "updateUser",
      emit: true,
      handle: ActionTypes.AUTH_UPDATE_USER,
      payload: { data: fields }
    };

    expect(actions.updateUser(fields)).toEqual(expectedAction);
  });
});
