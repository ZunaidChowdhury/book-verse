'use client';

import { useRef } from "react";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, Provider } from "react-redux";
import globalReducer from "@/redux/slices/globalSlice";
import themeReducer from "@/redux/slices/themeSlice";
import userReducer from "@/redux/slices/userSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

/* REDUX PERSISTENCE */
const createNoopStorage = () => {
    return {
        getItem(_key) {
            return Promise.resolve(null);
        },
        setItem(_key, value) {
            return Promise.resolve(value);
        },
        removeItem(_key) {
            return Promise.resolve();
        },
    };
};

const storage =
    typeof window === "undefined"
        ? createNoopStorage()
        : createWebStorage("local");

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["global", "theme", "user"],
};

const rootReducer = combineReducers({
    global: globalReducer,
    theme: themeReducer,
    user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

/* REDUX STORE */
export const makeStore = () => {
    return configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                    ignoredActionPaths: ['payload'],
                    ignoredPaths: ['user.user.createdAt', 'user.user.updatedAt'],
                },
            }),
    });
};

/* REDUX CUSTOM HOOKS */
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

/* PROVIDER */
export default function StoreProvider({ children }) {
    const storeRef = useRef(null);
    
    if (!storeRef.current) {
        storeRef.current = makeStore();
        setupListeners(storeRef.current.dispatch);
    }
    
    const persistor = persistStore(storeRef.current);

    return (
        <Provider store={storeRef.current}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    );
}
