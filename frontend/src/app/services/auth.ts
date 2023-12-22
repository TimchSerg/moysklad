// import { retry } from '@reduxjs/toolkit/query/react'
import { api } from './api'

export interface User {
  id: string;
  accountId: string;
  name: string
  phone: string
  role: string
  avatar: string
  birthday: string | null
  city: any;
}

export interface UserResponse {
  login: string
  password: string
}

export interface LoginRequest {
  access_token: string
  refresh_token: string
}

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginRequest, Partial<UserResponse>>({
      query: (credentials: any) => ({
        url: '/authorization/token',
        method: 'POST',
        body: credentials,
      }),
      transformErrorResponse: (response) => {
        return response;
      },
      
      invalidatesTags: ['Auth'],
    }),
    currentMe: build.query<User, void>({
      query: () => ({ url: '/authorization/users' }),
      providesTags: () => [
        { type: 'Auth' },
      ],
    }),
    putAccount: build.mutation<{}, Partial<any>>({
      query: (credentials: any) => ({
        url: `/account/${credentials.accountId}`,
        method: 'PUT',
        body: credentials,
      })
    }),
    uploadAvatar: build.mutation<void, Partial<any>>({
      query: (credentials: any) => {
        const fd = new FormData();
        fd.append('avatar', credentials.file, credentials.file.name)

        return {
          url: `/account/${credentials.accountId}/upload/avatar`,
          method: 'PUT',
          body: fd,
          credentials: 'include',
        }
      }
    }),
    getManagers: build.query<any[], void>({
      query: () => ({ url: '/account/managers/list' }),
      providesTags: () => [
        { type: 'Auth' },
      ],
    }),
    getManagersList: build.mutation<{}, Partial<any>>({
      query: () => ({
        url: `/account/managers/list`,
        method: 'GET'
      })
    }),
  }),
})

export const { useLoginMutation, useCurrentMeQuery, useGetManagersListMutation, usePutAccountMutation, useUploadAvatarMutation } = authApi;
