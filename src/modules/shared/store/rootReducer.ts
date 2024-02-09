import { combineReducers } from '@reduxjs/toolkit'

import themeReducer from './slices/theme/themeSlice'
import authReducer from '../../auth/data/authSlice'

const rootReducer = combineReducers({
  theme: themeReducer,
  auth: authReducer,
})

export default rootReducer
