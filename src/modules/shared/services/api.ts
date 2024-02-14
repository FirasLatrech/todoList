// https://github.com/reduxjs/redux-toolkit/tree/master/examples/query/react

import { FetchArgs, createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import { clearTokens, setTokens } from '@src/modules/auth/utils/token'
import axiosInstance from '../utils/axios'
import { localStorageAdapter } from '../utils/localStorageAdapter'

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env['VITE_APP_BASE_URL'] as string,
  prepareHeaders: (headers) => {
    const token = localStorageAdapter.get('access_token')
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  },
})

const staggeredBaseQueryWithBailOut = retry(async (args: string | FetchArgs, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions)
  console.log({ result })
  if (result.error) {
    if (result.error.status === 401) {
      try {
        const response = await axiosInstance.get('/auth/refresh')
        const { accessToken } = response.data.payload
        setTokens(accessToken)

        const retryResult = await baseQuery(args, api, extraOptions)
        return retryResult
      } catch (err) {
        clearTokens()
        window.location.replace('/')
        return result
      }
    }
    retry.fail(result.error?.data)
  }

  return result
})

const baseQueryWithRetry = staggeredBaseQueryWithBailOut

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithRetry,
  endpoints: () => ({}),
})
