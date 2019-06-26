import { createStore, applyMiddleware } from "redux";
import rootReducer, { defaultState } from "./reducer";
import socketMiddleware from "./middleware/socket";

const middlewares = [socketMiddleware()];
const enhancer = applyMiddleware(...middlewares);

const initialState = defaultState;

const store = createStore(rootReducer, initialState, enhancer);

export { store };
