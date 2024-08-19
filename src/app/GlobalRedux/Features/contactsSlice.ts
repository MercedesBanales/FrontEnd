'use client'

import { Contact } from '@/types/Contact';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store'
import * as contactsService from '@/services/contactsService';
import { createAppAsyncThunk } from '../../withTypes';
import { userLogout } from './activeUserSlice';

export const fetchContacts = createAppAsyncThunk('contacts/fetchContacts', async () => {
  try {
    return await contactsService.getContacts();
  } catch (err: any){
    throw new Error(err.message)
  }
})

export const createNewContact = createAppAsyncThunk('contacts/createContact', async (formData: FormData) => {
  try {
    const response = await contactsService.createContact(formData);
    return { id: response.id, 
        name: formData.get('name'), 
        surname: formData.get('surname'),
        address: formData.get('address'), 
        title: formData.get('title'),
        email: formData.get('email'), 
        phone: formData.get('phone'), 
        imagePath: response.path } as Contact
  } catch (err: any) {
    throw new Error(err.message)
  }

})

export const updateOriginalContact = createAppAsyncThunk('contacts/updateContact', async (data: { formData: FormData, contact: Contact }) => {
  try {
    const contact = data.contact;
    const formData = data.formData;
    const response = await contactsService.updateContact(formData, contact.id);
    return { id: contact!.id, 
        name: formData.get('name') ? formData.get('name')!.toString() : contact!.name,
        surname: formData.get('surname') ? formData.get('surname')!.toString() : contact!.surname,
        address: formData.get('address') ? formData.get('address')!.toString() : contact!.address,
        title: formData.get('title') ? formData.get('title')!.toString() : contact!.title,
        email: formData.get('email') ? formData.get('email')!.toString() : contact!.email,
        phone: formData.get('phone') ? formData.get('phone')!.toString() : contact!.phone,
        imagePath: (response) ? response : contact!.imagePath}
  } catch (err: any) {
    throw new Error(err.message)
  }
})

interface ContactsState {
    contacts: Contact[];
    error: string | null;
}

const initialState: ContactsState = {
    contacts: [],
    error: null
}

export const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        builder
          .addCase(fetchContacts.fulfilled, (state, action) => {
            state.contacts = action.payload;
          })
          .addCase(fetchContacts.rejected, (state, action) => {
            state.error = action.error.message ?? 'Unknown Error'
          })
          .addCase(createNewContact.fulfilled, (state, action) => {
            state.contacts.push(action.payload)
          })
          .addCase(createNewContact.rejected, (state, action) => {
            state.error = action.error.message ?? 'Unknown Error'
          })
          .addCase(updateOriginalContact.fulfilled, (state, action) => {
            state.contacts = state.contacts.map(contact => 
                contact.id === action.payload.id ? action.payload : contact
            );
          })
          .addCase(updateOriginalContact.rejected, (state, action) => {
            state.error = action.error.message ?? 'Unknown Error'
          })
          .addCase(userLogout, (state) => {
            state.contacts = [];
            state.error = null;
          });
      }
});

export const { } = contactsSlice.actions;
export default contactsSlice.reducer;

export const getContacts = (state: RootState) => state.contacts.contacts;
export const selectContactsError = (state: RootState) => state.contacts.error;
