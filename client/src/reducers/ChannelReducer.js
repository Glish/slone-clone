import * as R from "ramda";
import { createReducer } from "redux-create-reducer";
import { ActionTypes, defaultState } from "../utilities/channelValues";

const channelReducer = createReducer(defaultState, {
  [ActionTypes.CHANNELS_GET]: (state, action) => {
    return R.mergeDeepRight(state, {
      isLoading: false,
      channels: action.data.channels
    });
  },
  [ActionTypes.CHANNEL_CREATE]: (state, action) => {
    return R.mergeDeepRight(state, {
      isLoading: false,
      channels: R.append(action.data, state.channels)
    });
  },
  [ActionTypes.CHANNEL_JOIN]: (state, action) => {
    return R.merge(state, {
      selectedChannel: action.data
    });
  }
});

export default channelReducer;
