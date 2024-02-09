/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../shared/utils/axios'
import { LoginPayload, RegisterPayload } from './authTypes'

export const login = createAsyncThunk(
  'auth/login',
  async (query: LoginPayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/api/auth/login`, query)

      if (response.status === 200) {
        return response.data
      }

      throw new Error(response.statusText)
    } catch (err: any) {
      return rejectWithValue(err)
    }
  }
)

export const register = createAsyncThunk(
  'auth/register',
  async (query: RegisterPayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/api/auth/register`, query)

      if (response.status === 201) {
        return response.data
      }

      throw new Error(response.statusText)
    } catch (err: any) {
      return rejectWithValue(err)
    }
  }
)

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`/api/auth/logout`)

    if (response.status === 200) {
      return response.data
    }

    throw new Error(response.statusText)
  } catch (err: any) {
    return rejectWithValue(err)
  }
})
