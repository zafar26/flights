import { combineReducers } from "redux";
import fetchingreducer from "./fetchingflights";

export default combineReducers({
  flights: fetchingreducer
});
