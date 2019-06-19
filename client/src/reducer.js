import { combineReducers } from "redux";
import values from "./utilities/values";

import AuthReducer from "./reducers/AuthReducer";
import ChannelReducer from "./reducers/ChannelReducer";

export const defaultState = {
  debug: {}
};

export function debugReducer(state = defaultState, action) {
  if (values.settings.debug) console.log("🔄 ", action.type);
  switch (action.type) {
    default:
      return {};
  }
}

const appReducer = combineReducers({
  debug: debugReducer,
  auth: AuthReducer,
  channel: ChannelReducer
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
