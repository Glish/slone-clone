import authReducer from "./AuthReducer";

import { reducer, createReducer } from "redux-create-reducer";
import { ActionTypes } from "../utilities/authValues";

const { AUTH_LOGOUT, AUTH_GET_USER_SUCCESS } = ActionTypes;

describe("auth reducer", () => {
  it("should return the initial state", () => {
    const defaultState = {
      error: false,
      isLoading: false,
      isLoggedIn: false,
      token: null,
      user: undefined
    };

    /*
    expect(
      authReducer(defaultState, {
        loading: (defaultState, { isLoading: true })
      })
    ).toEqual(defaultState);
    */

    expect(authReducer(defaultState, { AUTH_LOGOUT })).toEqual(defaultState);
    expect(authReducer(defaultState, { AUTH_GET_USER_SUCCESS })).toEqual(
      defaultState
    );
  });

  /*
  it("should handle AUTH_LOGOUT", () => {
    expect(
      reducer([], {
        type: ActionTypes.AUTH_LOGOUT
      })
    ).toEqual();
  });
  */
});
