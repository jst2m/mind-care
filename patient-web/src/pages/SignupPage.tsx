// src/pages/SignupPage.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { signup } from '../features/auth/authSlice'
import { Navigate, Link } from 'react-router-dom'

// Type local pour le formulaire
type SignupForm = {
  email: string
  motDePasse: string
  prenom: string
  nom: string
  dateNaissance: string
  sexe: 'Homme' | 'Femme' | 'Ne préfère pas dire'
  role: 'patient'
}

export const SignupPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const { token, status, error } = useAppSelector((s) => s.auth)

  const [form, setForm] = useState<SignupForm>({
    email: '',
    motDePasse: '',
    prenom: '',
    nom: '',
    dateNaissance: '',
    sexe: 'Ne préfère pas dire',
    role: 'patient',
  })

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setForm((prev: SignupForm) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    dispatch(signup(form))
  }

  // Si déjà inscrit / connecté, on redirige
  if (token) {
    return <Navigate to="/patient" replace />
  }

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h1>Inscription Patient</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          Email<br/>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>
        <br/><br/>
        <label>
          Mot de passe<br/>
          <input
            type="password"
            name="motDePasse"
            value={form.motDePasse}
            onChange={handleChange}
            required
          />
        </label>
        <br/><br/>
        <label>
          Prénom<br/>
          <input
            type="text"
            name="prenom"
            value={form.prenom}
            onChange={handleChange}
            required
          />
        </label>
        <br/><br/>
        <label>
          Nom<br/>
          <input
            type="text"
            name="nom"
            value={form.nom}
            onChange={handleChange}
            required
          />
        </label>
        <br/><br/>
        <label>
          Date de naissance<br/>
          <input
            type="date"
            name="dateNaissance"
            value={form.dateNaissance}
            onChange={handleChange}
          />
        </label>
        <br/><br/>
        <label>
          Sexe<br/>
          <select
            name="sexe"
            value={form.sexe}
            onChange={handleChange}
          >
            <option value="Homme">Homme</option>
            <option value="Femme">Femme</option>
            <option value="Ne préfère pas dire">Ne préfère pas dire</option>
          </select>
        </label>
        {/* role fixé en input hidden */}
        <input type="hidden" name="role" value="patient" />
        <br/><br/>
        <button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Inscription…' : 'S’inscrire'}
        </button>
      </form>
      <p style={{ marginTop: '1rem' }}>
        Déjà inscrit ? <Link to="/login">Se connecter</Link>
      </p>
    </div>
  )
}
