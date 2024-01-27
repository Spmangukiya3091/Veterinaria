import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import {
  adminApi,
  appoinmentApi,
  dashboardApi,
  inventoryApi,
  ownersApi,
  paymentApi,
  petApi,
  // productApi,
  vaccinationApi,
  vaccineApi,
  veterinaApi,
} from "../services/ApiServices";
import { toastReducer } from "./tostify";
import { loginDetailsReducer } from "./LoginDetails";

export const store = configureStore({
  reducer: {
    toaster: toastReducer,
    loginDetails: loginDetailsReducer,
    [adminApi.reducerPath]: adminApi.reducer,
    // [productApi.reducerPath]: productApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [veterinaApi.reducerPath]: veterinaApi.reducer,
    [appoinmentApi.reducerPath]: appoinmentApi.reducer,
    [ownersApi.reducerPath]: ownersApi.reducer,
    [petApi.reducerPath]: petApi.reducer,
    [vaccinationApi.reducerPath]: vaccinationApi.reducer,
    [vaccineApi.reducerPath]: vaccineApi.reducer,
    [inventoryApi.reducerPath]: inventoryApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      adminApi.middleware,
      // productApi.middleware,
      dashboardApi.middleware,
      veterinaApi.middleware,
      appoinmentApi.middleware,
      ownersApi.middleware,
      petApi.middleware,
      vaccinationApi.middleware,
      vaccineApi.middleware,
      inventoryApi.middleware,
      paymentApi.middleware,
    ]),
});

setupListeners(store.dispatch);
