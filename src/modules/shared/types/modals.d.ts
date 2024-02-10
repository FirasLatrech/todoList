interface openModalPayload {
  id: string
  data?: any
}

interface closeModalPayload {
  id: string
}

interface ModalsState {
  [key: string]: { open: boolean; data?: any }
}
