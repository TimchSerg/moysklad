import { api } from './api'

export interface ILog {
  name: string;
  createdAt: Date;
  description: string;
}

export const restaurantsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getLogging: build.mutation<any, void>({
      query: () => {
        return {
          url: '/logging',
          method: 'GET'
        };
      },
    })
  }),
})

export const { 
  useGetLoggingMutation
} = restaurantsApi;