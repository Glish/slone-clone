import io from "socket.io-client";
import { store } from "../store";
import { ActionTypes as ChannelActionTypes } from "../utilities/channelValues";
import { ActionTypes as AuthActionTypes } from "../utilities/authValues";

const socketIOReduxMiddleware = () => {
  let socket = io("http://localhost:9000", {
    forceNew: true,
    query: { token: localStorage.getItem("token") }
  });

  socket.on("serverError", error => {
    if (error === "unauthorized") {
      return store.dispatch({ type: AuthActionTypes.AUTH_LOGOUT });
    }

    store.dispatch({ type: AuthActionTypes.AUTH_ERROR, error });
  });

  socket.on("userJoinedChannel", data => {
    store.dispatch({ type: ChannelActionTypes.CHANNEL_USER_JOINED, data });
  });

  socket.on("messageCreated", data => {
    store.dispatch({ type: ChannelActionTypes.CHANNEL_MESSAGE_CREATED, data });
  });

  return ({ dispatch }) => next => action => {
    if (typeof action === "function") {
      return next(action);
    }
    const { event, leave, emit, payload, handle, ...rest } = action;
    if (!event) {
      // alert(`TYPE: ${action.type}`);
      return next(action);
    }

    if (leave) {
      socket.removeListener(event);
    }

    if (emit) {
      dispatch({
        type: `${action.handle.substring(
          0,
          action.handle.lastIndexOf("/") + 1
        )}LOADING`
      });
      // alert(`${action.handle} - ${event}`);
      socket.emit(event, payload);
    }

    if (handle) {
      let handleEvent = handle;
      if (typeof handleEvent === "string") {
        handleEvent = data =>
          dispatch({ type: `${handle}_SUCCESS`, data, ...rest });
      }

      return socket.once(event, handleEvent);
    }
  };
};

export default socketIOReduxMiddleware;
