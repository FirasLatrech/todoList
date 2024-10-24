import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface DashboardState {
  filter: {
    status: string | null
    search: string
  }
}

const initialState: DashboardState = {
  filter: {
    status: null,
    search: '',
  },
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setStatusFilter: (state, action: PayloadAction<string | null>) => {
      state.filter.status = action.payload
    },
    setSearchFilter: (state, action: PayloadAction<string>) => {
      state.filter.search = action.payload
    },
    clearFilters: (state) => {
      state.filter = initialState.filter
    },
  },
})

export const { setStatusFilter, setSearchFilter, clearFilters } = dashboardSlice.actions
export default dashboardSlice.reducer
