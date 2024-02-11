import { combineReducers } from '@reduxjs/toolkit'

import themeReducer from './slices/theme/themeSlice'
import authReducer from '../../auth/data/authSlice'
import { api } from '../services/api'

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  theme: themeReducer,
  auth: authReducer,
})

export default rootReducer
