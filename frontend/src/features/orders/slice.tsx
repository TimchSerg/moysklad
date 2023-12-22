import { createSlice } from '@reduxjs/toolkit'

import type { RootState } from '../../app/store'
import { ordersApi } from 'app/services/orders';
import { IOrder } from 'app/interfaces/orders'

type OrdersState = {
  list: IOrder[],
}

const initialState = {
  list: []
}

const slice = createSlice({
  name: 'orders',
  initialState: initialState as OrdersState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        ordersApi.endpoints.getOrders.matchFulfilled,
        (state, { payload }) => {
          state.list = payload
        }
      )
  },
})

export const { } = slice.actions // eslint-disable-line

export default slice.reducer

export const selectAllOrders = (state: RootState) => state.orders.list