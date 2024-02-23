import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import userReducer from './userReducer'

const store = configureStore({
  reducer: {
    user: userReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export default store
