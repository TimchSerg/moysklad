import { IUser } from 'app/interfaces/user';
import { api } from './api';

export const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getOwners: build.query({
      query: () => `/users/owners`,
    }),
    getUserById: build.mutation<IUser, {id: string}>({
      query: (arg) => {
        return {
          url: `/users/${arg.id}`,
          method: 'GET'
        };
      },
    }),
  }),
})

export const { useGetOwnersQuery, useGetUserByIdMutation } = usersApi;