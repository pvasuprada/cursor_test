import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  region: null,
  market: null,
  date: null,
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setRegion: (state, action) => {
      state.region = action.payload;
    },
    setMarket: (state, action) => {
      state.market = action.payload;
    },
    setDate: (state, action) => {
      state.date = action.payload;
    },
    resetFilters: (state) => {
      state.region = null;
      state.market = null;
      state.date = null;
    },
  },
});

export const { setRegion, setMarket, setDate, resetFilters } =
  filterSlice.actions;
export default filterSlice.reducer;
