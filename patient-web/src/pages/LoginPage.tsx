// src/pages/LoginPage.tsx
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { login } from '../features/auth/authSlice'
import { Navigate } from 'react-router-dom'

export const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const token = useAppSelector(s => s.auth.token)
  const status = useAppSelector(s => s.auth.status)

  const [email, setEmail] = useState('')
  const [motDePasse, setMotDePasse] = useState('')

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(login({ email, motDePasse }))
  }

  if (token) {
    // déjà connecté → redirige vers /patient
    return <Navigate to="/patient" replace />
  }

  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      <h1>Connexion</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>Email</label><br />
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mot de passe</label><br />
          <input
            type="password"
            value={motDePasse}
            onChange={e => setMotDePasse(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? '…' : 'Se connecter'}
        </button>
      </form>
      {status === 'failed' && <p style={{ color: 'red' }}>Échec de la connexion</p>}
    </div>
  )
}
