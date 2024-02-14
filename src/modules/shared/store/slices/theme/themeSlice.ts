import { createSlice } from '@reduxjs/toolkit'
import { localStorageAdapter } from '@src/modules/shared/utils/localStorageAdapter'

const getTheme = () => {
  return localStorageAdapter?.get('theme') || 'light'
}

interface ThemeState {
  mode: string
}

const initialState: ThemeState = {
  mode: getTheme(),
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      localStorageAdapter.set('theme', state.mode === 'light' ? 'dark' : 'light')
      state.mode = state.mode === 'light' ? 'dark' : 'light'
    },
  },
})

export default themeSlice.reducer

export const { toggleTheme } = themeSlice.actions
