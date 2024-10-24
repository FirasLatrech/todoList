import React, { useState, useCallback } from 'react'
import { Plus } from 'lucide-react'
import { Todo } from '../../types/types'

interface AddTodoFormProps {
  onAddTodo: (newTodo: Omit<Todo, '_id' | 'nextCursor' | 'createdAt'>) => void
}
enum Status {
  OPEN = 'open',
  IN_PROGRESS = 'in progress',
  COMPLETED = 'completed',
  ARCHIVED = 'archived',
  CANCELLED = 'cancelled',
}

const useColorLuminance = () => {
  return useCallback((color: string) => {
    const rgb = parseInt(color.slice(1), 16)
    const r = (rgb >> 16) & 0xff
    const g = (rgb >> 8) & 0xff
    const b = (rgb >> 0) & 0xff
    return 0.2126 * r + 0.7152 * g + 0.0722 * b
  }, [])
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({ onAddTodo }) => {
  const [name, setName] = useState('')
  const [status, setStatus] = useState<Status>(Status.OPEN)
  const StatusOptions = Object.values(Status)

  const [color, setColor] = useState('#000000')
  const calculateLuminance = useColorLuminance()

  const handleReset = () => {
    setName('')
    setStatus(Status.OPEN)
    setColor('#000000')
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddTodo({ name, status, color })
    handleReset()
  }
  const handleSetStatus = (status: string) => {
    setStatus(status as Status)
  }
  const luminance = calculateLuminance(color)
  console.log(luminance)
  return (
    <div className="add-todo-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New todo"
          required
        />
        <select value={status} onChange={(e) => handleSetStatus(e.target.value)}>
          {StatusOptions.map((status, key) => (
            <option value={status} key={key}>
              {status}
            </option>
          ))}
        </select>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="color-picker"
        />
        <button
          type="submit"
          className="add-todo-button"
          style={{
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = color
            e.currentTarget.style.color = luminance > 128 ? '#000000' : '#FFFFFF'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent'
            e.currentTarget.style.color = '#000000'
          }}
        >
          Add Todo <Plus size={20} style={{ marginLeft: '0.5rem' }} />
        </button>
      </form>
    </div>
  )
}

export default AddTodoForm
