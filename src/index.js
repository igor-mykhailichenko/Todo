import React from "react";
import ReactDOM from "react-dom";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {Provider} from "react-redux";

import reducers from "./reducers/index";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";

const reducer = combineReducers({ ...reducers });
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById("root")
);