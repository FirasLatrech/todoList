import React, { useState } from 'react'
import { BarChart2 } from 'lucide-react'
import {
  useGetTodosQuery,
  useAddManyTodoMutation,
  useDeleteManyTodoMutation,
} from '../../services/dashboardApi'
import { useAppDispatch, useAppSelector } from '@src/modules/shared/store'
import { setSearchFilter, setStatusFilter } from '@src/modules/dashboard/store/dashboardSlice'
import Button from '@src/modules/shared/components/Button'

const TodoStats: React.FC = () => {
  const { data } = useGetTodosQuery({ page: 1, limit: 1 })
  const activeFilter = useAppSelector((state) => state.dashboard.filter.status)

  const [addManyTodo] = useAddManyTodoMutation()
  const [deleteManyTodo] = useDeleteManyTodoMutation()
  const dispatch = useAppDispatch()
  const [searchTerm, setSearchTerm] = useState('')
  const [count, setCount] = useState(1000)
  const [deleteCount, setDeleteCount] = useState(1000)

  if (!data) return null

  const counts = {
    open: 0,
    'in progress': 0,
    completed: 0,
    archived: 0,
    cancelled: 0,
  }

  data.todos.forEach((todo) => {
    counts[todo.status]++
  })
  const handleFilterClick = (status: string) => {
    if (activeFilter === status) {
      dispatch(setStatusFilter(''))
    } else {
      dispatch(setStatusFilter(status))
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    dispatch(setSearchFilter(e.target.value))
  }

  const handleAddRandomTodos = async () => {
    addManyTodo({ count: count || 100 })
  }

  const handleDeleteTodos = async () => {
    deleteManyTodo({ count: deleteCount > 10000000 ? 10000000 : deleteCount || 100 })
  }

  return (
    <>
      <div className="todo-stats">
        <h2>
          <BarChart2 className="icon" /> Task Statistics
        </h2>
        <div>
          Total Count : {Object.values(data.statusCount).reduce((acc, curr) => acc + curr, 0)}
        </div>

        <div className="stats-grid">
          {Object.entries(data.statusCount)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([status, count]) => (
              <div
                key={status}
                className={activeFilter === status ? 'stat-item active' : 'stat-item'}
                onClick={() => handleFilterClick(status)}
              >
                <p className="stat-value">{count}</p>
                <p className="stat-label">{status.charAt(0).toUpperCase() + status.slice(1)}</p>
              </div>
            ))}
        </div>
      </div>
      <div className="todo-stats">
        <h2>
          <BarChart2 className="icon" /> Advanced Options
        </h2>
        <div className="stats-grid">
          <div className="stat-item">
            <p>Search</p>
            <input
              name="search"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search todos..."
            />
          </div>
          <div className="stat-item">
            <p>Performance Test</p>
            <input
              type="number"
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value))}
            />

            <Button onClick={handleAddRandomTodos} className="stat-item-button">
              Add Todos
            </Button>
          </div>
          <div className="stat-item">
            <p>Delete Todos</p>
            <input
              type="number"
              value={deleteCount}
              onChange={(e) => setDeleteCount(parseInt(e.target.value))}
            />

            <Button onClick={handleDeleteTodos} className="stat-item-button">
              Delete Todos
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default TodoStats
