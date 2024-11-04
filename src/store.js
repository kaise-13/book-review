import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './Slices/authSlice'
import { pagenateSlice } from './Slices/pagenateSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    pagenate: pagenateSlice.reducer,
  },
})
