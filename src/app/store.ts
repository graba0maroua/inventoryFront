import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "./../features/auth/auth-slice";
import { apiSlice } from "./../features/auth/login";
import { centreSlice } from "../features/centre/centre";
import mainUiReducer from "../features/uistate/mainui";
import {infrastructureLocaliteSlice} from "../features/infrastructure/infrastructureLocalite";
import {planSlice} from "../features/PlanInventaire/Plan";
import {ChefCentreSlice} from "../features/ListeInventaire/ChefCentre";
import planUiSlice from "../features/PlanInventaire/Plan-ui";
import {AdminSlice} from "../features/Admin/Admin";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [centreSlice.reducerPath]: centreSlice.reducer,
    mainUiSlice: mainUiReducer,
    planUiSlice: planUiSlice,
    [infrastructureLocaliteSlice.reducerPath]: infrastructureLocaliteSlice.reducer,
    [planSlice.reducerPath]: planSlice.reducer,
    [ChefCentreSlice.reducerPath]: ChefCentreSlice.reducer,
    [AdminSlice.reducerPath]: AdminSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false }).concat(
      apiSlice.middleware,
      centreSlice.middleware,
      infrastructureLocaliteSlice.middleware,
      planSlice.middleware,
      ChefCentreSlice.middleware,
      AdminSlice.middleware,


    );
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;


