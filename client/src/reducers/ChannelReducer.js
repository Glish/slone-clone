import * as R from "ramda";
import { createReducer } from "redux-create-reducer";
import { ActionTypes, defaultState } from "../utilities/channelValues";

const channelReducer = createReducer(defaultState, {
  [ActionTypes.CHANNELS_GET]: (state, action) => {
    return R.merge(state, {
      isLoading: true
    });
  },
  [ActionTypes.CHANNELS_GET_SUCCESS]: (state, action) => {
    return R.mergeDeepRight(state, {
      isLoading: false,
      channels: action.data.channels
    });
  },
  [ActionTypes.CHANNEL_CREATE]: (state, action) => {
    return R.merge(state, {
      isLoading: true
    });
  },
  [ActionTypes.CHANNEL_CREATE_SUCCESS]: (state, action) => {
    alert(JSON.stringify(action.data));
    return R.mergeDeepRight(state, {
      isLoading: false,
      channels: R.append(action.data, state.channels)
    });
  },
  [ActionTypes.CHANNEL_JOIN]: (state, action) => {
    return R.merge(state, {
      isLoading: true
    });
  },
  [ActionTypes.CHANNEL_JOIN_SUCCESS]: (state, action) => {
    return R.merge(state, {
      isLoading: false,
      selectedChannel: action.data
    });
  },
  [ActionTypes.CREATE_MESSAGE]: (state, action) => {
    return state;
  }
});

export default channelReducer;
