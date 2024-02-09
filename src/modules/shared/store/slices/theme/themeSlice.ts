import { createSlice } from '@reduxjs/toolkit'

const getTheme = () => {
  return localStorage?.getItem('theme') || 'light'
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
      localStorage.setItem('theme', state.mode === 'light' ? 'dark' : 'light')
      state.mode = state.mode === 'light' ? 'dark' : 'light'
    },
  },
})

export default themeSlice.reducer

export const { toggleTheme } = themeSlice.actions
