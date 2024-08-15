'use client'

import { User } from '@/types/User';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as usersService from '@/services/usersService';
import * as authenticationService from '@/services/authenticationService';
import { createAppAsyncThunk } from '../../withTypes';
import { RootState } from '../store';

export const login = createAppAsyncThunk('users/login', async (formData: FormData) => {
    await authenticationService.login(formData);
    return await usersService.getUser();
  })

interface UserState {
    value: User | null;
}

const initialState: UserState = {
    value: null,
}

export const activeUserSlice = createSlice({
    name: 'activeUser',
    initialState,
    reducers: {
        setActiveUser: (state, action: PayloadAction<User | null>) => {
            state.value = action.payload;
        },
    },
    extraReducers: builder => {
        builder
          .addCase(login.pending, (state) => {
            state.value = null;
          })
          .addCase(login.fulfilled, (state, action) => {
            state.value = action.payload;
          })
          .addCase(login.rejected, (state) => {
            state.value = null;
          })
      }
});

export const { setActiveUser } = activeUserSlice.actions;
export default activeUserSlice.reducer;
export const selectActiveUser = (state: RootState) => state.activeUser.value;
