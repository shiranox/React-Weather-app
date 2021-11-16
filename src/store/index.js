import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import favorites from "./favorites";
import weather from "./weather";
import location from "./location";
import temperature from "./temperatureType";

const reducer = combineReducers({
  favorites,
  weather,
  location,
  temperature,
});
const store = configureStore({
  reducer,
});
export default store;
