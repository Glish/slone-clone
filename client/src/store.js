import { createStore, applyMiddleware } from "redux";

import values from "./utilities/values";

import rootReducer, { defaultState } from "./reducer";

import axios from "axios";
import axiosMiddleware from "redux-axios-middleware";

let httpClient = axios.create({
  baseURL: values.server.baseUrl,
  responseType: "json",
  headers: {
    common: {
      "Cache-Control": "no-cache"
    }
  },
  timeout: 20000
});

const middlewares = [axiosMiddleware(httpClient, {})];

const enhancer = applyMiddleware(...middlewares);

const initialState = defaultState;

const store = createStore(rootReducer, initialState, enhancer);

httpClient.interceptors.request.use(
  config => {
    const state = store.getState();
    let token = state && state.auth && state.auth.token;

    if (!token) {
      token = sessionStorage.getItem("token");
    }

    if (token) {
      if (values.settings.debug) console.log("💉 Injecting token", token);
      config.headers.Authorization = token;
    }
    return config;
  },
  error => Promise.reject(error)
);

export { store };
