import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import api from '../../app/api'
import type { AxiosError } from 'axios'


// dto envoyé au back pour l'inscription
export interface SignupDto {
  email: string
  motDePasse: string
  prenom: string
  nom: string
  dateNaissance?: string
  sexe: 'Homme' | 'Femme' | 'Ne préfère pas dire'
  role: 'patient' | 'professionnel'
}

// dto envoyé au back pour la connexion
export interface LoginDto {
  email: string
  motDePasse: string
}

// Type User côté front
export interface User {
  uuid: string
  email: string
  prenom?: string
  nom?: string
  dateNaissance?: string
  sexe?: 'Homme' | 'Femme' | 'Ne préfère pas dire'
  role: 'patient' | 'professionnel'
  accessToken?: string
}

//state slice auth
interface AuthState {
  user: User | null
  token: string | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error?: string
}

const initialState: AuthState = {
  user: null,
  token: null,
  status: 'idle',
  error: undefined,
}



// Inscription
export const signup = createAsyncThunk<
  User,            // type retourné si succès
  SignupDto,       // type du paramètre dto
  { rejectValue: string }
>('auth/signup', async (dto, { rejectWithValue }) => {
  try {
    const resp = await api.post<User>('/auth/signup', dto)
    return resp.data
  } catch (err: any) {
    const msg =
      (err as AxiosError<{ message: string }>).response?.data.message ||
      err.message
    return rejectWithValue(msg)
  }
})

// Connexion
export const login = createAsyncThunk<
  User,
  LoginDto,
  { rejectValue: string }
>('auth/login', async (dto, { rejectWithValue }) => {
  try {
    // j attend { accessToken, sub, role } du back
    const resp = await api.post<{
      accessToken: string
      sub: string
      role: 'patient' | 'professionnel'
    }>('/auth/login', dto)
    return {
      uuid: resp.data.sub,
      email: dto.email,
      role: resp.data.role,
      accessToken: resp.data.accessToken,
    }
  } catch (err: any) {
    const msg =
      (err as AxiosError<{ message: string }>).response?.data.message ||
      err.message
    return rejectWithValue(msg)
  }
})


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null
      state.token = null
      state.status = 'idle'
      state.error = undefined
    },
  },
  extraReducers: builder => {
    // = signup =
    builder
      .addCase(signup.pending, state => {
        state.status = 'loading'
        state.error = undefined
      })
      .addCase(signup.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'succeeded'
        state.user = action.payload
        // si le back renvoie le token dès l'inscription :
        if (action.payload.accessToken) {
          state.token = action.payload.accessToken
        }
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || action.error.message
      })

    // = login =
    builder
      .addCase(login.pending, state => {
        state.status = 'loading'
        state.error = undefined
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'succeeded'
        state.user = {
          uuid: action.payload.uuid,
          email: action.payload.email,
          role: action.payload.role,
        }
        state.token = action.payload.accessToken || null
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || action.error.message
      })
  },
})



export const { logout } = authSlice.actions

export const selectAuth = (state: RootState) => state.auth

export default authSlice.reducer
