import { createSlice } from "@reduxjs/toolkit";
import api from "../api/routes";
import http from "../api/httpService";
import constants from "../constants/globalConstants";

const slice = createSlice({
  name: "location",
  initialState: {
    locations: null,
    currentLocation: null,
    loading: false,
    error: "",
    errors: false,
  },
  reducers: {
    getLocationsSuccess: (state, action) => {
      state.locations = action.payload;
      state.loading = false;
      state.errors = false;
    },
    getLocationsError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.errors = true;
    },
    setCurrentLocationSuccess: (state, action) => {
      state.currentLocation = action.payload;
      state.loading = false;
      state.errors = false;
    },
    setCurrentLocationError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.errors = true;
    },
  },
});
export default slice.reducer;
const {
  getLocationsSuccess,
  getLocationsError,
  setCurrentLocationSuccess,
  setCurrentLocationError,
} = slice.actions;

export const getLocations = (search) => async (dispatch) => {
  try {
    const res = await http.get(
      `${api.LOCATIONS}?apikey=${constants.API_KEY}&q=${encodeURIComponent(
        search
      )}`
    );
    dispatch(getLocationsSuccess(res.data));
  } catch (e) {
    dispatch(getLocationsError(e.message));
  }
};

export const setCurrentLocation = (locationKey) => async (dispatch) => {
  try {
    const res = await http.get(
      `${api.LOCATION}/${locationKey}?apikey=${constants.API_KEY}`
    );
    dispatch(setCurrentLocationSuccess(res.data));
  } catch (e) {
    dispatch(setCurrentLocationError(e.message));
  }
};
