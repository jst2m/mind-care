import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import { setAuthToken } from './api'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // …vos autres slices
  }
})
// src/app/store.ts

//import { setAuthToken } from './api' // ou d’où qu’elle vienne

let currentToken: string | null = null

store.subscribe(() => {
  const token = store.getState().auth.token // string | null
  if (token !== currentToken) {
    currentToken = token
    // on passe undefined si token est null
    setAuthToken(token ?? undefined)
  }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
