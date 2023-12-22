import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

type WindowsState = {
  restaurants: any
  kitchen: any
}

const initialState = {
  restaurants: {
    add: false,
    edit: false,
    deleteImage: false,
    deactivateRestaurant: false,
    addImages: false,
  },
  kitchen: {
    add: false,
    edit: false,
  }
}

interface IShowWindow {
  type: string
  name: string
}

const slice = createSlice({
  name: 'windows',
  initialState: initialState as WindowsState,
  reducers: {
    show: ( state, action: PayloadAction<IShowWindow> ) => {
      const arg = action.payload;

      if(arg.type === 'restaurants') state[arg.type][arg.name] = true
      if(arg.type === 'kitchen') state[arg.type][arg.name] = true
    },
    hide: ( state, action: PayloadAction<IShowWindow> ) => {
      const arg = action.payload;

      if(arg.type === 'restaurants') state[arg.type][arg.name] = false
      if(arg.type === 'kitchen') state[arg.type][arg.name] = false
    },
  }
})

export const { show, hide } = slice.actions

export default slice.reducer

export const selectAllWindows = (state: RootState) => state.windows
export const selectRestaurantWindows = (state: RootState) => state.windows.restaurants