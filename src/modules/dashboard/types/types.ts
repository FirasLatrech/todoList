export interface Todo {
  _id: string
  name: string
  status: 'open' | 'in progress' | 'completed' | 'archived' | 'cancelled'
  color: string
  nextCursor: string
  createdAt: string
}

export interface TodosResponse {
  total: number
  page: number
  limit: number
  statusCount: {
    open: number
    'in progress': number
    completed: number
    archived: number
    cancelled: number
  }
  todos: Todo[]
}
