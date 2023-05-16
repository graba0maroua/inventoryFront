import { configureStore ,getDefaultMiddleware} from "@reduxjs/toolkit";
import authReducer from "./../features/auth/auth-slice";
import { apiSlice } from "./../features/auth/login";
import { centreSlice } from "../features/centre/centre";


export const store = configureStore({
    reducer:{
        auth:authReducer,
        [apiSlice.reducerPath]:apiSlice.reducer,
        [centreSlice.reducerPath]:centreSlice.reducer

    },
    
    middleware:(getDefaultMiddleware)=>{
        return getDefaultMiddleware({serializableCheck:false}).concat(
            apiSlice.middleware,
            centreSlice.middleware


        );

    }
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;


