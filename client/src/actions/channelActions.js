import { ActionTypes } from "../utilities/channelValues";

export const getChannels = () => {
  return {
    event: "getChannels",
    emit: true,
    handle: ActionTypes.CHANNELS_GET
  };
};

export const createChannel = name => {
  return {
    event: "createChannel",
    emit: true,
    handle: ActionTypes.CHANNEL_CREATE,
    payload: { data: name }
  };
};

export const joinChannel = id => {
  return {
    event: "joinChannel",
    emit: true,
    handle: ActionTypes.CHANNEL_JOIN,
    payload: { data: id }
  };
};

export const createMessage = message => {
  return {
    event: "createMessage",
    emit: true,
    handle: ActionTypes.CREATE_MESSAGE,
    payload: { data: { message } }
  };
};
