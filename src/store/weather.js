import { createSlice } from "@reduxjs/toolkit";
import api from "../api/routes";
import http from "../api/httpService";
import constants from "../constants/globalConstants";

const slice = createSlice({
  name: "weather",
  initialState: {
    currentWeather: {},
    dailyWeather: null,
    loading: false,
    error: "",
    errors: false,
  },
  reducers: {
    request: (state, action) => {
      state.loading = true;
      state.errors = false;
    },
    getDailyWeatherSuccess: (state, action) => {
      state.dailyWeather = action.payload;
      state.loading = false;
      state.errors = false;
    },
    getDailyWeatherError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.errors = true;
    },
    getCurrentWeatherSuccess: (state, action) => {
      state.currentWeather = action.payload;
      state.loading = false;
      state.errors = false;
    },
    getCurrentWeatherError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.errors = true;
    },
  },
});
export default slice.reducer;
const {
  getDailyWeatherSuccess,
  getDailyWeatherError,
  getCurrentWeatherSuccess,
  getCurrentWeatherError,
  request,
} = slice.actions;

export const getDailyWeather = (locationKey) => async (dispatch) => {
  try {
    dispatch(request());
    const res = await http.get(
      `${api.WEATHER_DAILY}/${locationKey}?apikey=${constants.API_KEY}`
    );
    dispatch(getDailyWeatherSuccess(res.data));
  } catch (e) {
    dispatch(getDailyWeatherError(e.message));
  }
};

export const getCurrentWeather = (locationKey, metric) => async (dispatch) => {
  try {
    const res = await http.get(
      `${api.WEATHER}/${locationKey}?apikey=${constants.API_KEY}&metric=${metric}`
    );
    dispatch(getCurrentWeatherSuccess(res.data[0]));
  } catch (e) {
    dispatch(getCurrentWeatherError(e.message));
  }
};
