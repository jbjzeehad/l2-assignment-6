import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { baseApi } from "./api/baseApi";
import { authSlice } from "./slice/auth.slice";

import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { pageSlice } from "./slice/page.slice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authSlice.reducer,
  page: pageSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(baseApi.middleware),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
