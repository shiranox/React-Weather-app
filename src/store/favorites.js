import { createSlice } from "@reduxjs/toolkit";
import api from "../api/routes";
import http from "../api/httpService";
import constants from "../constants/globalConstants";

// Slice
const slice = createSlice({
  name: "favorites",
  initialState: {
    favorites: {},
    loading: false,
    error: "",
    errors: false,
  },
  reducers: {
    addToFavoritesSuccess: (state, action) => {
      state.favorites = {
        ...state.favorites,
        [action.payload.Key]: action.payload,
      };
      state.loading = false;
      state.errors = false;
    },
    addToFavoritesError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.errors = true;
    },
    removeFavoriteSuccess: (state, action) => {
      delete state.favorites[action.payload.Key];
      state.loading = false;
      state.errors = false;
    },
    removeFavoriteError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.errors = true;
    },
  },
});
export default slice.reducer;
// Actions
const {
  addToFavoritesSuccess,
  addToFavoritesError,
  removeFavoriteSuccess,
  removeFavoriteError,
} = slice.actions;

export const addToFavorites = (location) => async (dispatch) => {
  try {
    const res = await http.get(
      `${api.WEATHER}/${location.Key}?apikey=${constants.API_KEY}`
    );
    let data = { ...location, data: res.data[0] };
    dispatch(addToFavoritesSuccess(data));
  } catch (e) {
    dispatch(addToFavoritesError(e));
  }
};

export const removeFavorites = (location) => async (dispatch) => {
  try {
    dispatch(removeFavoriteSuccess(location));
  } catch (e) {
    dispatch(removeFavoriteError(e.message));
  }
};
