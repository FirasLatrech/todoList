import React, { useState } from 'react'
import {
  Edit,
  Trash2,
  Check,
  X,
  CheckCircle,
  Clock,
  Circle,
  LockOpenIcon,
  CircleX,
  Archive,
} from 'lucide-react'
import { Todo } from '../../types/types'
// import TodoDetails from '../TodoDetails'
import { useAppDispatch } from '@src/modules/shared/store'
import { openModal } from '@src/modules/shared/store/slices/modals/modalsSlice'

interface TodoItemProps {
  todo: Todo
  onUpdate: (updatedTodo: Todo) => void
  onDelete: (todoId: string) => void
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState(todo.name)

  const dispatch = useAppDispatch()

  const handleUpdate = () => {
    onUpdate({ ...todo, name: editedName })
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div className="todo-item editing">
        <input
          type="text"
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleUpdate()
            }
          }}
          className="edit-input"
        />
        <div className="todo-actions">
          <button onClick={handleUpdate} className="save">
            <Check size={20} />
          </button>
          <button onClick={() => setIsEditing(false)} className="cancel">
            <X size={20} />
          </button>
        </div>
      </div>
    )
  }

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setIsEditing(true)
  }

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    onDelete(todo._id.toString())
  }

  return (
    <div
      className="todo-item"
      onClick={() => {
        dispatch(openModal({ id: 'todo-details-modal', data: todo }))
      }}
    >
      <div className="todo-content">
        <div className="todo-color-badge" style={{ borderColor: todo.color }}></div>
        <span className={`todo-name ${todo.status === 'completed' ? 'completed' : ''}`}>
          {todo.name}
        </span>
      </div>
      <div className="todo-actions" onClick={(e) => e.stopPropagation()}>
        <div className="status" title={`Status: ${todo.status}`}>
          {todo.status === 'completed' ? (
            <>
              Completed <CheckCircle size={20} />
            </>
          ) : todo.status === 'in progress' ? (
            <>
              In Progress <Clock size={20} />
            </>
          ) : todo.status === 'open' ? (
            <>
              {todo.status} <LockOpenIcon size={20} />
            </>
          ) : todo.status === 'cancelled' ? (
            <>
              {todo.status} <CircleX size={20} />
            </>
          ) : todo.status === 'archived' ? (
            <>
              {todo.status} <Archive size={20} />
            </>
          ) : (
            <>
              {todo.status} <Circle size={20} />
            </>
          )}
        </div>
        <button onClick={handleEdit} className="edit">
          <Edit size={20} />
        </button>
        <button onClick={handleDelete} className="delete">
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  )
}

export default TodoItem
