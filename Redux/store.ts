import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/CartSlice'
import tumpangReducer from './features/TumpangSlice'

export default configureStore({
  reducer: {
      cart: cartReducer,
      tumpang: tumpangReducer,
  }
})