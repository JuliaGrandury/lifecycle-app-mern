import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import itemReducer from '../features/items/itemSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    items: itemReducer,
  },
})
