import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import usersReducer from './Users/UserSlice';

export const allReducers = combineReducers({
    users: usersReducer,
})

const persistConfig = {
    key: "root",
    version: 1,
    storage,
    whitelist: ['users']
};

const persistedReducer = persistReducer(persistConfig, allReducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
            serializableCheck: false
        }),
});

export const persistor = persistStore(store);