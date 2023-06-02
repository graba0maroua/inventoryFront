import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "./../features/auth/auth-slice";
import { apiSlice } from "./../features/auth/login";
import { centreSlice } from "../features/centre/centre";
import mainUiReducer from "../features/uistate/mainui";
import {infrastructureLocaliteSlice} from "../features/infrastructure/infrastructureLocalite";
import {InfrastructureCentreSlice} from "../features/infrastructure/infrastructureCentre";
import {InfrastructureUniteSlice} from "../features/infrastructure/infrastructureUnite";
import {planSlice} from "../features/PlanInventaire/Plan";
import {ChefCentreSlice} from "../features/ListeInventaire/ChefCentre";
import {ChefUniteSlice} from "../features/ListeInventaire/ChefUnite";
import {ChefEquipeSlice} from "../features/ListeInventaire/ChefEquipe";
import {LineChartSlice} from "../features/Charts/LineChart";
import {PieChartSlice} from "../features/Charts/PieChart";
import {localiteSlice} from "../features/ListeInventaire/LocalitesVisEtNonVisite";
import planUiSlice from "../features/PlanInventaire/Plan-ui";
import {AdminSlice} from "../features/Admin/Admin";
import snackBarSlice from "../features/snack_bar/snack_bar";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [centreSlice.reducerPath]: centreSlice.reducer,
    mainUiSlice: mainUiReducer,
    planUiSlice: planUiSlice,
    snackBar:snackBarSlice,
    [infrastructureLocaliteSlice.reducerPath]: infrastructureLocaliteSlice.reducer,
    [InfrastructureUniteSlice.reducerPath]: InfrastructureUniteSlice.reducer,
    [InfrastructureCentreSlice.reducerPath]: InfrastructureCentreSlice.reducer,
    [planSlice.reducerPath]: planSlice.reducer,
    [ChefCentreSlice.reducerPath]: ChefCentreSlice.reducer,
    [ChefEquipeSlice.reducerPath]: ChefEquipeSlice.reducer,
    [ChefUniteSlice.reducerPath]: ChefUniteSlice.reducer,
    [AdminSlice.reducerPath]: AdminSlice.reducer,
    [LineChartSlice.reducerPath]: LineChartSlice.reducer,
    [localiteSlice.reducerPath]: localiteSlice.reducer, 
    [PieChartSlice.reducerPath]: PieChartSlice.reducer, 
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false }).concat(
      apiSlice.middleware,
      centreSlice.middleware,
      infrastructureLocaliteSlice.middleware,
      InfrastructureUniteSlice.middleware,
      InfrastructureCentreSlice.middleware,
      planSlice.middleware,
      ChefCentreSlice.middleware,
      ChefUniteSlice.middleware,
      ChefEquipeSlice.middleware,
      AdminSlice.middleware,
      localiteSlice.middleware,
      LineChartSlice.middleware,
      PieChartSlice.middleware,


    );
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;


