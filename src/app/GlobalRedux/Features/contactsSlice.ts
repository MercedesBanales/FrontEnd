'use client'

import { Contact } from '@/types/Contact';
import { ContactState } from '@/types/ContactState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: ContactState = {
    value: [],
}

export const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        setContacts: (state, action: PayloadAction<Contact[]>) => {
            state.value = action.payload;
        },
        addContact: (state, action: PayloadAction<Contact>) => {
            state.value.push(action.payload);
        }
    },
});

export const { setContacts, addContact } = contactsSlice.actions;
export default contactsSlice.reducer;