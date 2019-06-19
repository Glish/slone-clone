export const ActionTypes = {
  CHANNELS_GET: "slone/channel/CHANNELS_GET",
  CHANNEL_CREATE: "slone/channel/CHANNEL_CREATE",
  CHANNEL_JOIN: "slone/channel/CHANNEL_JOIN"
};

export const defaultState = {
  isLoading: true,
  channels: undefined,
  selectedChannel: undefined,
  error: false
};
