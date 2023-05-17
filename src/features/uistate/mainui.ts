import { createSlice } from "@reduxjs/toolkit";

export interface MainUiState {
  marginLeft: string;
}

const initialState: MainUiState = {
  marginLeft: "90px", // You can put an empty string if you don't want to have a margin in the first load of the page
};

const mainUiSlice = createSlice({
  name: "mainUiSlice",
  initialState,
  reducers: {
    setMarginLeft(state, action) {
        return {...state,marginLeft:action.payload}
    },
  },
});

export const { setMarginLeft } = mainUiSlice.actions;
export default mainUiSlice.reducer;