export const ActionTypes = {
  CHANNELS_GET: "slone/channel/CHANNELS_GET",
  CHANNEL_CREATE: "slone/channel/CHANNEL_CREATE"
};

export const defaultState = {
  isLoading: true,
  channels: undefined,
  selectedChannel: undefined,
  error: false
};
