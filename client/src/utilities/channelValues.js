export const ActionTypes = {
  CHANNELS_GET: "slone/channel/CHANNELS_GET",
  CHANNELS_GET_SUCCESS: "slone/channel/CHANNELS_GET_SUCCESS",
  CHANNEL_CREATE: "slone/channel/CHANNEL_CREATE",
  CHANNEL_CREATE_SUCCESS: "slone/channel/CHANNEL_CREATE_SUCCESS",
  CHANNEL_JOIN: "slone/channel/CHANNEL_JOIN",
  CHANNEL_JOIN_SUCCESS: "slone/channel/CHANNEL_JOIN_SUCCESS",
  CREATE_MESSAGE: "slone/channel/CREATE_MESSAGE",
  CREATE_MESSAGE_SUCCESS: "slone/channel/CREATE_MESSAGE_SUCCESS"
};

export const defaultState = {
  isLoading: true,
  channels: undefined,
  selectedChannel: undefined,
  error: false
};
