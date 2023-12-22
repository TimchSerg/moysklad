import { api } from './api'

export const ordersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getOrders: build.mutation<any, null>({
      query: () => {
        return {
          url: '/orders',
          method: 'GET',
        };
      },
    }),
    getOrderById: build.mutation<any, {id: string}>({
      query: (arg) => {
        return {
          url: `/orders/${arg.id}`,
          method: 'GET'
        };
      },
    })
  }),
})

export const { 
  useGetOrdersMutation,
  useGetOrderByIdMutation
} = ordersApi;