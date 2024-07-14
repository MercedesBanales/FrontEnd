'use client'

import { Contact } from '@/types/Contact';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedContactState {
    value: Contact;
}

const initialState: SelectedContactState = {
    value: {} as Contact,
}

export const selectedContactSlice = createSlice({
    name: 'selectedContact',
    initialState,
    reducers: {
        setContact: (state, action: PayloadAction<Contact>) => {
            state.value = action.payload;
        },
    },
});

export const { setContact } = selectedContactSlice.actions;
export default selectedContactSlice.reducer;