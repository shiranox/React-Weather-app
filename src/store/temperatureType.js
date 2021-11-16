import { createSlice } from "@reduxjs/toolkit";
import constants from "../constants/globalConstants";

const slice = createSlice({
  name: "temperature",
  initialState: {
    temperatureType: constants.types.Fahrenheit,
    loading: false,
    error: "",
    errors: false,
  },
  reducers: {
    setTypeSuccess: (state, action) => {
      state.temperatureType = action.payload;
      state.loading = false;
      state.errors = false;
    },
    setTypeError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.errors = true;
    },
  },
});
export default slice.reducer;
const { setTypeSuccess, setTypeError } = slice.actions;

export const setTempType = (type) => async (dispatch) => {
  try {
    dispatch(setTypeSuccess(type));
  } catch (e) {
    dispatch(setTypeError(e));
  }
};
