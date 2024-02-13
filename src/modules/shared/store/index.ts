import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { VITE_APP_ENABLE_REDUX_DEVTOOLS } from '@src/config'
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'
import { api } from '../services/api'

export const store = configureStore({
  reducer: rootReducer,
  devTools: VITE_APP_ENABLE_REDUX_DEVTOOLS,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
