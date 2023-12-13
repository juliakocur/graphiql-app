import { PersistConfig, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthSlice';
import graphReducer from './GraphQLSlice';
import schemaReducer from './SchemaSlice';

const rootReducer = combineReducers({
  authReducer,
  graphReducer,
  schemaReducer,
});

const persistConfig: PersistConfig<RootState> = {
  key: 'auth',
  storage,
  whitelist: ['authReducer', 'graphReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
