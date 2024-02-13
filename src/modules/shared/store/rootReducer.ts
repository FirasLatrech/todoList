import { combineReducers } from '@reduxjs/toolkit'

import themeReducer from './slices/theme/themeSlice'
import authReducer from '../../auth/data/authSlice'
import modalsReducer from './slices/modals/modalsSlice'

const rootReducer = combineReducers({
  theme: themeReducer,
  auth: authReducer,
  modals: modalsReducer,
})

export default rootReducer
