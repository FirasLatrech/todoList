import { api } from '@src/modules/shared/services/api'

interface IUser {
  id: string
  firstName: string
  lastName: string
  email: string
  username: string
  fullName: string
}

export const DashboardApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query({
      query: (params) => {
        return {
          url: `api/users`,
          params,
        }
      },

      transformResponse: (response: { payload: IUser[] }): IUser[] => {
        return response.payload
      },

      providesTags: (result: any) => {
        return [
          result?.map(({ id }: { id: string }) => ({ type: 'USERS', id })),
          { type: 'USERS', id: 'USER' },
        ]
      },
    }),
    getOneUser: build.query({
      query: (id) => {
        return {
          url: `api/users/${id}`,
        }
      },
    }),
    updateUser: build.mutation({
      query: ({ id, ...body }) => {
        return {
          url: `api/users/${id}`,
          method: 'POST',
          body,
        }
      },
    }),
  }),
})

export const { useGetUsersQuery, useGetOneUserQuery, useUpdateUserMutation } = DashboardApi
