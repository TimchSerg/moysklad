import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'
import { authApi, User } from '../../app/services/auth'
import type { RootState } from '../../app/store'
import { clearTokens, setTokenStorage } from 'app/services/tokens'

type AuthState = {
  isAuthenticated: boolean,
  user: User | null,
  managers: any[]
}

const slice = createSlice({
  name: 'auth',
  initialState: { isAuthenticated: false, user: null, managers: [] } as AuthState,
  reducers: {
    logout: ( state ) => {
      clearTokens();
      state.isAuthenticated = false
      state.user = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          setTokenStorage(payload)
          state.isAuthenticated = true
        }
      )
      .addMatcher(
        authApi.endpoints.currentMe.matchFulfilled,
        (state, { payload }) => {
          const user = {
            id: payload.id,
            accountId: payload.accountId,
            name: payload?.name,
            phone: payload?.phone,
            role: payload?.role,
            avatar: payload?.avatar,
            birthday: payload?.birthday,
            city: payload?.city,
          }
          
          state.isAuthenticated = true
          state.user = user
        }
      )
      .addMatcher(
        authApi.endpoints.getManagers.matchFulfilled,
        (state, { payload }) => {
          state.managers = payload
        }
      )
  },
})

export const { logout } = slice.actions

export default slice.reducer

export const selectAuth = (state: RootState) => state.auth.isAuthenticated
export const selectUser = (state: RootState) => state.auth.user
export const selectManagers = (state: RootState) => state.auth.managers