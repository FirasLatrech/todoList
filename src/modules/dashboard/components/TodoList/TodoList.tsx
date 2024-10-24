import React, { useCallback, useState, useMemo } from 'react'
import { FixedSizeList as List } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'
import { ListPlus } from 'lucide-react'
import TodoItem from '../TodoItem'
import {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from '../../services/dashboardApi'
import AddTodoForm from '../AddTodoForm'
import { Todo } from '../../types/types'
import { useAppSelector } from '@src/modules/shared/store'

const TodoList: React.FC = () => {
  const [page, setPage] = useState(1)
  const filter = useAppSelector((state) => state.dashboard.filter)

  const { data, isFetching } = useGetTodosQuery({
    page: 1,
    limit: 10 * page,
    status: filter.status || '',
    search: filter.search || '',
  })

  const [addTodo] = useAddTodoMutation()
  const [updateTodo] = useUpdateTodoMutation()
  const [deleteTodo] = useDeleteTodoMutation()

  const hasNextPage = (data?.todos?.length || 0) < (data?.total || 0)

  const loadMoreItems = useCallback(() => {
    if (!isFetching && hasNextPage) {
      setPage((prev) => prev + 1)
    }
  }, [isFetching, hasNextPage])

  const isItemLoaded = (index: number) => !hasNextPage || index < (data?.todos?.length || 0)

  const handleAddTodo = async (newTodo: Omit<Todo, '_id' | 'createdAt' | 'nextCursor'>) => {
    try {
      await addTodo(newTodo as Todo).unwrap()
    } catch (error) {
      console.error('Failed to add todo:', error)
    }
  }

  const handleUpdateTodo = async (updatedTodo: Todo) => {
    try {
      await updateTodo(updatedTodo).unwrap()
    } catch (error) {
      console.error('Failed to update todo:', error)
    }
  }

  const handleDeleteTodo = async (todoId: string) => {
    try {
      await deleteTodo(todoId).unwrap()
    } catch (error) {
      console.error('Failed to delete todo:', error)
    }
  }

  const Row = useMemo(
    () =>
      React.memo(({ index, style }: { index: number; style: React.CSSProperties }) => {
        if (!isItemLoaded(index)) {
          return (
            <div style={style} className="todo-list-item-loading">
              {/* Loading... */}
            </div>
          )
        }
        const todo = data?.todos?.[index]
        return (
          <div style={style}>
            <TodoItem todo={todo as Todo} onUpdate={handleUpdateTodo} onDelete={handleDeleteTodo} />
          </div>
        )
      }),
    [data?.todos, isItemLoaded, handleUpdateTodo, handleDeleteTodo]
  )

  return (
    <div className="todo-list">
      <h1 className="text-3xl font-bold mb-4 flex items-center">
        <ListPlus className="mr-2" /> Todo List
      </h1>
      <AddTodoForm onAddTodo={handleAddTodo} />
      <div className="mt-4">
        <InfiniteLoader
          isItemLoaded={isItemLoaded}
          itemCount={data?.total || 0}
          threshold={10}
          loadMoreItems={loadMoreItems}
        >
          {({ onItemsRendered, ref }) => (
            <List
              height={400}
              itemCount={data?.total || 0}
              itemSize={50}
              width="100%"
              onItemsRendered={onItemsRendered}
              ref={ref}
            >
              {Row}
            </List>
          )}
        </InfiniteLoader>
      </div>
    </div>
  )
}

export default TodoList
//V2
// import React, { useCallback, useState, useEffect, useRef } from 'react'
// import { ListPlus } from 'lucide-react'
// import TodoItem from '../TodoItem'
// import {
//   useGetTodosQuery,
//   useAddTodoMutation,
//   useUpdateTodoMutation,
//   useDeleteTodoMutation,
// } from '../../services/dashboardApi'
// import AddTodoForm from '../AddTodoForm'
// import { Todo } from '../../types/types'
// import { useAppSelector } from '@src/modules/shared/store'

// const ITEM_HEIGHT = 50
// const CONTAINER_HEIGHT = 400
// const BUFFER_SIZE = 5

// const TodoList: React.FC = () => {
//   const [page, setPage] = useState(1)
//   const [visibleStartIndex, setVisibleStartIndex] = useState(0)
//   const containerRef = useRef<HTMLDivElement>(null)
//   const filter = useAppSelector((state) => state.dashboard.filter)

//   const { data, isFetching } = useGetTodosQuery({
//     page: 1,
//     limit: 10 * page,
//     status: filter.status || '',
//     search: filter.search || '',
//   })

//   const [addTodo] = useAddTodoMutation()
//   const [updateTodo] = useUpdateTodoMutation()
//   const [deleteTodo] = useDeleteTodoMutation()

//   const hasNextPage = (data?.todos?.length || 0) < (data?.total || 0)

//   const loadMoreItems = useCallback(() => {
//     if (!isFetching && hasNextPage) {
//       setPage((prev) => prev + 1)
//     }
//   }, [isFetching, hasNextPage])

//   const handleScroll = useCallback(() => {
//     if (containerRef.current) {
//       const scrollTop = containerRef.current.scrollTop
//       const newVisibleStartIndex = Math.floor(scrollTop / ITEM_HEIGHT)
//       setVisibleStartIndex(newVisibleStartIndex)

//       if (scrollTop + CONTAINER_HEIGHT >= containerRef.current.scrollHeight - 100) {
//         loadMoreItems()
//       }
//     }
//   }, [loadMoreItems])

//   useEffect(() => {
//     const container = containerRef.current
//     if (container) {
//       container.addEventListener('scroll', handleScroll)
//       return () => container.removeEventListener('scroll', handleScroll)
//     }
//   }, [handleScroll])

//   const handleAddTodo = async (newTodo: Omit<Todo, '_id'>) => {
//     try {
//       await addTodo(newTodo as Todo).unwrap()
//     } catch (error) {
//       console.error('Failed to add todo:', error)
//     }
//   }

//   const handleUpdateTodo = async (updatedTodo: Todo) => {
//     try {
//       await updateTodo(updatedTodo).unwrap()
//     } catch (error) {
//       console.error('Failed to update todo:', error)
//     }
//   }

//   const handleDeleteTodo = async (todoId: string) => {
//     try {
//       await deleteTodo(todoId).unwrap()
//     } catch (error) {
//       console.error('Failed to delete todo:', error)
//     }
//   }

//   const visibleTodos = data?.todos?.slice(
//     Math.max(0, visibleStartIndex - BUFFER_SIZE),
//     Math.min(
//       data?.todos?.length || 0,
//       visibleStartIndex + Math.ceil(CONTAINER_HEIGHT / ITEM_HEIGHT) + BUFFER_SIZE
//     )
//   )

//   return (
//     <div className="todo-list">
//       <h1 className="todo-list__title">
//         <ListPlus className="todo-list__title-icon" /> Todo List
//       </h1>
//       <AddTodoForm onAddTodo={handleAddTodo} />
//       <div
//         ref={containerRef}
//         className="todo-list__list-container"
//         style={{ height: CONTAINER_HEIGHT, position: 'relative' }}
//       >
//         <div style={{ height: `${(data?.total || 0) * ITEM_HEIGHT}px` }}>
//           {visibleTodos?.map((todo, index) => (
//             <div
//               key={todo._id}
//               className="todo-list__todo-item-wrapper"
//               style={{
//                 top: `${(visibleStartIndex - BUFFER_SIZE + index) * ITEM_HEIGHT}px`,
//                 height: ITEM_HEIGHT,
//               }}
//             >
//               <TodoItem todo={todo} onUpdate={handleUpdateTodo} onDelete={handleDeleteTodo} />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default TodoList
