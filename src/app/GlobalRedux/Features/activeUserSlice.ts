'use client'

import { User } from '@/types/User';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
});

export const { setActiveUser } = activeUserSlice.actions;
export default activeUserSlice.reducer;