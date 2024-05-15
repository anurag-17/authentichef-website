import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./slice"; // Make sure the import path is correct
import dishReducer from "./dishSlice"; // Make sure the import path is correct

const rootReducer = combineReducers({
  auth: authReducer,
  userCart: dishReducer,
  // ADD new reducer here if needed
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
