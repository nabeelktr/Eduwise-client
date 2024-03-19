"use client"
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { apiSlice } from './features/api/apiSlice'
import authSlice from "./features/auth/authSlice"
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 


const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['auth'],
  };

  const persistedAuthReducer = persistReducer(persistConfig, combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
  }));

export const store = configureStore({
    // reducer: {
    //     [apiSlice.reducerPath]: apiSlice.reducer,
    //     auth: authSlice,
    // },
    reducer: persistedAuthReducer,
    devTools: false,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck:false}).concat(apiSlice.middleware)
})

export const persistor = persistStore(store);

// call refresh token function
const initializeApp = async () => {
    await store.dispatch(apiSlice.endpoints.refreshToken.initiate({}, {forceRefetch: true}));
    await store.dispatch(apiSlice.endpoints.loadUser.initiate({}, {forceRefetch: true}));
}


initializeApp();