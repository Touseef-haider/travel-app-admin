import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import alertReducer from "./reducers/alertReducer";
import authReducer from "./reducers/authReducer";

const devTool =
  typeof window === "object" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});

const rootReducer = combineReducers({
  auth: authReducer,
  alerts: alertReducer,
});

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

export default store;
