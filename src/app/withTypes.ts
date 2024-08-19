import { createAsyncThunk } from '@reduxjs/toolkit'

import type { RootState, AppDispatch } from './GlobalRedux/store'

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState
  dispatch: AppDispatch
}>()