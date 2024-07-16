'use client'

import { configureStore } from '@reduxjs/toolkit'
import contactsReducer from './Features/contactsSlice'
import selectedContactReducer from './Features/selectedContactSlice'
import activeUserReducer from './Features/activeUserSlice'

export const store = configureStore({
    reducer: {
        contacts: contactsReducer,
        selectedContact: selectedContactReducer,
        activeUser: activeUserReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch