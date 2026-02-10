
import { configureStore,combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./user/userSlice.jsx";
import { ModelDataSlice } from "./adminSlices/adminDashboardSlice/CarModelDataSlice.jsx";

const rootReducer = combineReducers({
  user : userReducer,
  modelDataSlice : ModelDataSlice
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: [
    "user",
    "userListVehicles",
    "bookingDataSlice",
    "selectRideSlice",
    "vendorBookingSlice",
    "latestBookingsSlice"
  ]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware)  =>
    getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
