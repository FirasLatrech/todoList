import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: ModalsState = {
  'example-modal': { open: false },
}

export const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<openModalPayload>) => {
      const { id, data } = action.payload
      state[id] = { open: true, data }
    },
    closeModal: (state, action: PayloadAction<closeModalPayload>) => {
      const { id } = action.payload
      state[id] = { open: false }
    },
  },
})

export const { openModal, closeModal } = modalsSlice.actions

export default modalsSlice.reducer
