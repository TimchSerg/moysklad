import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

type NorrState = {
  show: boolean
  severity: string
  message: string
}

const initialState = {
  show: false,
  severity: "",
  message: ""
}

interface IShowNorr {
  severity: string
  message: string
}

const slice = createSlice({
  name: 'norr',
  initialState: initialState as NorrState,
  reducers: {
    showNorr: ( state, action: PayloadAction<IShowNorr> ) => {
      const arg = action.payload;

      state.show = true
      state.severity = arg.severity
      state.message = arg.message
    },
    hideNorr: ( state ) => {
      state.show = false
      state.severity = ""
      state.message = ""
    },
  }
})

export const { showNorr, hideNorr } = slice.actions

export default slice.reducer

export const selectNorr = (state: RootState) => state.norr