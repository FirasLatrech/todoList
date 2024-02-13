import { combineReducers } from '@reduxjs/toolkit'

import themeReducer from './slices/theme/themeSlice'
import authReducer from '../../auth/data/authSlice'
import { api } from '../services/api'
import modalsReducer from './slices/modals/modalsSlice'

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  theme: themeReducer,
  auth: authReducer,
  modals: modalsReducer,
})

export default rootReducer
