import { createSlice } from "@reduxjs/toolkit";

export interface MainUiState {
  marginLeft: string;
  marginRight : string;
  url:string,
  isLoading:boolean,
  showUrlModal:boolean
}

const initialState: MainUiState = {
  url:"",
  isLoading:false,
  showUrlModal:false,
  marginLeft: "margin_left", // You can put an empty string if you don't want to have a margin in the first load of the page
  marginRight: "margin_right"
};

const mainUiSlice = createSlice({
  name: "mainUiSlice",
  initialState,
  reducers: {
    setMarginLeft(state, action) {
        return {...state,marginLeft:action.payload}
    },
    setMarginRight(state, action) {
        return {...state,marginRight:action.payload}
    },
    setLoadingState(state,action){
      return {...state,isLoading:action.payload}

    }
    ,
    setUrl(state,action){
      return {...state,url:action.payload}

    },
    setShowUrlModal(state,action){
      return {...state,showUrlModal:action.payload}

    }
  },
});

export const { setMarginLeft ,setMarginRight, setLoadingState,setShowUrlModal,setUrl } = mainUiSlice.actions;
export default mainUiSlice.reducer;