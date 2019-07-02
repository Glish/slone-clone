import * as R from "ramda";
import { createReducer } from "redux-create-reducer";
import { ActionTypes, defaultState } from "../utilities/channelValues";

const channelReducer = createReducer(defaultState, {
  [ActionTypes.CHANNEL_LOADING](state, action) {
    return R.merge(state, {
      isLoading: true,
      error: false
    });
  },
  [ActionTypes.CHANNELS_GET_SUCCESS]: (state, action) => {
    return R.mergeDeepRight(state, {
      isLoading: false,
      channels: action.data.channels,
      selectedChannel: action.data.selectedChannel
    });
  },
  [ActionTypes.CHANNEL_CREATE_SUCCESS]: (state, action) => {
    return R.mergeDeepRight(state, {
      isLoading: false,
      channels: R.append(action.data, state.channels)
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
  },
  [ActionTypes.CHANNEL_USER_JOINED]: (state, action) => {
    return R.merge(state, {
      isLoading: false,
      selectedChannelMembers: action.data.selectedChannelMembers
    });
  },
  [ActionTypes.CHANNEL_USER_LEFT]: (state, action) => {
    return R.merge(state, {
      isLoading: false,
      selectedChannelMembers: R.reject(
        R.propEq("id", action.data.user.id),
        state.selectedChannelMembers
      )
    });
  },
  [ActionTypes.CHANNEL_MESSAGE_CREATED]: (state, action) => {
    return R.mergeDeepRight(state, {
      isLoading: false,
      selectedChannel: {
        Messages: R.append(action.data.message, state.selectedChannel.Messages)
      }
    });
  }
});

export default channelReducer;
