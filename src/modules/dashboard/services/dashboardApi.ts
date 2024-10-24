// import { api } from '@src/modules/shared/services/api'
import { api } from '@src/modules/shared/services/api'
import { Todo, TodosResponse } from '../types/types'
import { removeDuplicatesById } from '@src/modules/shared/utils/removeduplicateId'

export const DashboardApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query<
      TodosResponse,
      { page: number; limit: number; status?: string; search?: string }
    >({
      query: ({ page, limit, status, search }) =>
        `todos?page=${page}&limit=${limit}&status=${status}&search=${search ? search : ''}`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
      merge: (currentCache, newItems, otherArgs) => {
        const withFilter = otherArgs.arg.status || otherArgs.arg.search
        const shouldCache = !withFilter
        if (newItems?.todos?.length > 0) {
          currentCache?.todos?.push(...newItems?.todos)
        }
        currentCache.limit = newItems?.limit
        currentCache.total = newItems?.total
        currentCache.page = newItems?.page
        currentCache.todos =
          shouldCache || otherArgs.arg.page > 1
            ? removeDuplicatesById(currentCache?.todos)
            : newItems?.todos
        return currentCache
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
    }),
    addTodo: builder.mutation<Todo, Omit<Todo, 'id' | 'createdAt'>>({
      query: (todo) => ({
        url: 'todos',
        method: 'POST',
        body: todo,
      }),
      async onQueryStarted(newTodo, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          DashboardApi.util.updateQueryData('getTodos', { page: 1, limit: 10 }, (draft) => {
            draft.todos.unshift({
              ...newTodo,
              _id: 'temp-id',
              createdAt: new Date().toISOString(),
            } as Todo)
            draft.total += 1
            draft.statusCount[newTodo.status] = (draft.statusCount[newTodo.status] || 0) + 1
          })
        )
        try {
          const { data } = await queryFulfilled
          dispatch(
            DashboardApi.util.updateQueryData('getTodos', { page: 1, limit: 10 }, (draft) => {
              const index = draft.todos.findIndex((todo) => todo._id === 'temp-id')
              if (index !== -1) draft.todos[index] = data
            })
          )
        } catch {
          patchResult.undo()
        }
      },
    }),
    addManyTodo: builder.mutation<{ message: string }, { count: number }>({
      query: (payload) => ({
        url: 'createMany',
        method: 'POST',
        body: payload,
      }),
      async onQueryStarted({ count }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          DashboardApi.util.updateQueryData('getTodos', { page: 1, limit: 10 }, (draft) => {
            const newTodos = Array.from(
              { length: count },
              (_, index) =>
                ({
                  _id: `temp-id-${index}`,
                  name: `New Todo ${index + 1}`,
                  description: '',
                  status: 'open',
                  createdAt: new Date().toISOString(),
                }) as any
            )
            draft.todos.unshift(...newTodos)
            draft.total += count
            draft.statusCount['open'] = (draft.statusCount['open'] || 0) + count
          })
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
    }),
    updateTodo: builder.mutation<Todo, Partial<Todo> & Pick<Todo, '_id'>>({
      query: ({ _id, ...patch }) => ({
        url: `todos/${_id}`,
        method: 'PUT',
        body: patch,
      }),
      async onQueryStarted({ _id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          DashboardApi.util.updateQueryData('getTodos', { page: 1, limit: 10 }, (draft) => {
            const todo = draft.todos.find((t) => t._id === _id)
            if (todo) {
              const oldStatus = todo.status
              Object.assign(todo, patch)
              if (patch.status && patch.status !== oldStatus) {
                draft.statusCount[oldStatus] -= 1
                draft.statusCount[patch.status] = (draft.statusCount[patch.status] || 0) + 1
              }
            }
          })
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
    }),
    deleteTodo: builder.mutation<void, string>({
      query: (_id) => ({
        url: `todos/${_id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(_id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          DashboardApi.util.updateQueryData('getTodos', { page: 1, limit: 10 }, (draft) => {
            const todoIndex = draft.todos.findIndex((t) => t._id === _id)
            if (todoIndex !== -1) {
              const deletedTodo = draft.todos[todoIndex] as Todo
              draft.todos.splice(todoIndex, 1)
              draft.total -= 1
              draft.statusCount[deletedTodo?.status] -= 1
            }
          })
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
    }),
    deleteManyTodo: builder.mutation<void, { count: number }>({
      query: ({ count }) => ({
        url: `deleteMany`,
        method: 'POST',
        body: { count },
      }),
      async onQueryStarted({ count }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          DashboardApi.util.updateQueryData('getTodos', { page: 1, limit: 10 }, (draft) => {
            const deletedTodos = draft.todos.slice(0, count)
            draft.todos.splice(0, count)
            draft.total -= count
            deletedTodos.forEach((todo) => {
              draft.statusCount[todo.status] -= 1
            })
          })
        )
        try {
          await queryFulfilled
          // You might want to refresh the data here to ensure consistency
          // dispatch(DashboardApi.util.invalidateTags(['Todos']));
        } catch {
          patchResult.undo()
        }
      },
    }),
  }),
})
export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useAddManyTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  useDeleteManyTodoMutation,
} = DashboardApi
