import React from "react";
import ReactDOM from "react-dom/client"; // Make sure to import from 'react-dom/client'
import AppWrapper from "./AppWrapper";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import loginReducer from "./loginSlice"; // Ensure this path is correct

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, loginReducer);

//const rootReducer = combineReducers({ login: loginReducer });
// const store = configureStore({
//   reducer: rootReducer,
// });

const store = configureStore({
  reducer: {
    login: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable the serializable check
    }),
});
export const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root")); // Use createRoot
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppWrapper />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
