import io from "socket.io-client";
// import * as R from "ramda";

export default () => {
  let socket = undefined;

  return ({ dispatch }) => next => action => {
    const token = localStorage.getItem("token");

    if (token && token !== "undefined" && !socket) {
      socket = io("http://localhost:9000", {
        query: { token: localStorage.getItem("token") }
      });
    }
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
    }

    let handleEvent = handle;
    if (typeof handleEvent === "string") {
      handleEvent = data => dispatch({ type: handle, data, ...rest });
    }

    return socket.on(event, handleEvent);
  };
};
