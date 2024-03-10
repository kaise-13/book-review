import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './authSlice'
import { pagenateSlice } from './pagenateSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    pagenate: pagenateSlice.reducer,
  },
})
