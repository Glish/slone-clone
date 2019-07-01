export const ActionTypes = {
  CHANNEL_LOADING: "slone/channel/LOADING",
  CHANNELS_GET: "slone/channel/CHANNELS_GET",
  CHANNELS_GET_SUCCESS: "slone/channel/CHANNELS_GET_SUCCESS",
  CHANNEL_CREATE: "slone/channel/CHANNEL_CREATE",
  CHANNEL_CREATE_SUCCESS: "slone/channel/CHANNEL_CREATE_SUCCESS",
  CHANNEL_JOIN: "slone/channel/CHANNEL_JOIN",
  CHANNEL_JOIN_SUCCESS: "slone/channel/CHANNEL_JOIN_SUCCESS",
  CHANNEL_USER_JOINED: "slone/channel/CHANNEL_USER_JOINED",
  CHANNEL_MESSAGE_CREATED: "slone/channel/CHANNEL_MESSAGE_CREATED",
  CREATE_MESSAGE: "slone/channel/CREATE_MESSAGE",
  CREATE_MESSAGE_SUCCESS: "slone/channel/CREATE_MESSAGE_SUCCESS"
};

export const defaultState = {
  isLoading: false,
  channels: undefined,
  selectedChannel: undefined,
  selectedChannelMembers: [],
  error: false
};
