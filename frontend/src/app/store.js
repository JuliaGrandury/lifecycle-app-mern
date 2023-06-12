import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice"
import itemReducer from "../features/items/itemSlice"
import listReducer from "../features/lists/listSlice"
import locationReducer from "../features/locations/locationSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    items: itemReducer,
    lists: listReducer,
    locations: locationReducer
  },
})
