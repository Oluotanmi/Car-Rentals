
import { configureStore,combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./user/userSlice.jsx";
import selectRideSlice from "./user/selectRideSlice.jsx";
import ModelDataSlice  from "./adminSlices/adminDashboardSlice/CarModelDataSlice.jsx";
import BookingDataSlice from "./user/BookingDataSlice.jsx";
import userListVehiclesReducer from "./user/listAllVehicleSlice.jsx"
import sortfilterSlice from "./user/sortfilterSlice.jsx"

const rootReducer = combineReducers({
  user : userReducer,
  selectRideSlice: selectRideSlice,
  userListVehicles: userListVehiclesReducer,
  modelDataSlice : ModelDataSlice,
  sortfilterSlice:sortfilterSlice,
  bookingDataSlice: BookingDataSlice,
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
