import * as R from "ramda";

export const to = promise => {
  return promise
    .then(data => {
      return [null, data];
    })
    .catch(err => {
      return [err];
    });
};

export const ResponseError = (res, err, code) => {
  if (typeof err === "object" && typeof err.message !== "undefined") {
    // eslint-disable-next-line no-param-reassign
    err = err.message;
  }

  if (typeof code !== "undefined") {
    res.statusCode = code;
  }

  return res.json({ success: false, error: err });
};

export const ResponseSuccess = (res, data, code) => {
  let sendData = { success: true };

  if (typeof data === "object") {
    sendData = R.merge(data, sendData);
  }

  if (typeof code !== "undefined") res.statusCode = code;

  return res.json(sendData);
};

export const ActionTypes = {
  AUTH_LOGIN: "slone/auth/AUTH_LOGIN",
  AUTH_LOGIN_SUCCESS: "slone/auth/AUTH_LOGIN_SUCCESS",
  AUTH_LOGIN_FAIL: "slone/auth/AUTH_LOGIN_FAIL",
  AUTH_LOGOUT: "slone/auth/AUTH_LOGOUT"
};
