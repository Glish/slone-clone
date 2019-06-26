import io from "socket.io-client";
import { logOut } from "../actions/authActions";
// import * as R from "ramda";

export default () => {
  let socket = io("http://localhost:9000", {
    query: { token: localStorage.getItem("token") }
  });

  return ({ dispatch }) => next => action => {
    if (typeof action === "function") {
      return next(action);
    }

    const { event, leave, emit, payload, handle, ...rest } = action;

    if (!event) {
      return next(action);
    }

    if (leave) {
      socket.removeListener(event);
    }

    if (emit) {
      socket.emit(event, payload);
      dispatch({ type: handle });
    }

    let handleEvent = handle;
    if (typeof handleEvent === "string") {
      handleEvent = data =>
        dispatch({ type: `${handle}_SUCCESS`, data, ...rest });
    }

    return socket.once(event, handleEvent);
  };
};
