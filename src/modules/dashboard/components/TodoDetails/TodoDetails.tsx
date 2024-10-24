import React from 'react'

import { format, formatDistanceToNow } from 'date-fns'
import { X, Calendar, Clock } from 'lucide-react'
import { Todo } from '../../types/types'

interface TodoDetailsProps {
  todo: Todo
  onClose: () => void
}

const TodoDetails: React.FC<TodoDetailsProps> = ({ todo, onClose }) => {
  return (
    <div className="todo-details">
      <div className="details-content">
        <div className="details-header">
          <h2>Task Details</h2>
          <button onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        <div className="details-body">
          <div>
            <h3>Name</h3>
            <p>{todo?.name}</p>
          </div>
          <div>
            <h3>Status</h3>
            <p className="capitalize">{todo?.status}</p>
          </div>
          <div>
            <h3>Color</h3>
            <div className="color-preview">
              <div className="color-swatch" style={{ backgroundColor: todo?.color }}></div>
              <span>{todo?.color}</span>
            </div>
          </div>
          <div>
            <h3>
              <Calendar className="icon" /> Created At
            </h3>
            <p>{todo?.createdAt ? format(new Date(todo.createdAt), 'PPpp') : 'N/A'}</p>
          </div>
          <div>
            <h3>
              <Clock className="icon" /> Time Since Creation
            </h3>
            <p>
              {todo?.createdAt
                ? formatDistanceToNow(new Date(todo.createdAt), { addSuffix: true })
                : 'N/A'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TodoDetails
