'use client'

import { configureStore } from '@reduxjs/toolkit'
import contactsReducer from './Features/contactsSlice'
import selectedContactReducer from './Features/selectedContactSlice'

export const store = configureStore({
    reducer: {
        contacts: contactsReducer,
        selectedContact: selectedContactReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch