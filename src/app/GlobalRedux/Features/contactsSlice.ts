'use client'

import { Contact } from '@/types/Contact';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store'
import * as contactsService from '@/services/contactsService';
import { createAppAsyncThunk } from '../../withTypes';

export const fetchContacts = createAppAsyncThunk('contacts/fetchContacts', async () => {
    return await contactsService.getContacts();
})

interface ContactsState {
    contacts: Contact[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | null;
}

const initialState: ContactsState = {
    contacts: [],
    status: 'idle',
    error: null
}

export const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        setContacts: (state, action: PayloadAction<Contact[]>) => {
            state.contacts = action.payload;
        },
        addContact: (state, action: PayloadAction<Contact>) => {
            state.contacts.push(action.payload);
        }
    },
    extraReducers: builder => {
        builder
          .addCase(fetchContacts.pending, (state) => {
            state.status = 'loading'
          })
          .addCase(fetchContacts.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.contacts = action.payload;
          })
          .addCase(fetchContacts.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message ?? 'Unknown Error'
          })
      }
});

export const { setContacts, addContact } = contactsSlice.actions;
export default contactsSlice.reducer;

export const getContacts = (state: RootState) => state.contacts.contacts;
export const selectContactsStatus = (state: RootState) => state.contacts.status;
export const selectContactsError = (state: RootState) => state.contacts.error;
