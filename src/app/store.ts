import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "./../features/auth/auth-slice";
import { apiSlice } from "./../features/auth/login";
import { centreSlice } from "../features/centre/centre";
import mainUiReducer from "../features/uistate/mainui";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [centreSlice.reducerPath]: centreSlice.reducer,
    mainUiSlice: mainUiReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false }).concat(
      apiSlice.middleware,
      centreSlice.middleware
    );
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;


