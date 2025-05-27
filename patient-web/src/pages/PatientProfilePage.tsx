// src/pages/PatientProfilePage.tsx
import React, { useEffect, useState } from 'react'
import api from '../app/api'

interface Donnees {
  allergies: string[]
  antecedents: Record<string, any>
}

export const PatientProfilePage: React.FC = () => {
  const [data, setData] = useState<Donnees | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    api.get<Donnees>('/patient')
      .then(resp => setData(resp.data))
      .catch(() => setError('Impossible de charger vos données'))
      .finally(() => setLoading(false))
  }, [])

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!data) return
    api.put<Donnees>('/patient', data)
      .then(resp => setData(resp.data))
      .catch(() => setError('Échec de la mise à jour'))
  }

  if (loading) return <p>Chargement…</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>

  return (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      <h1>Mon profil patient</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>Allergies (virgule-séparées)</label><br />
          <input
            type="text"
            value={data!.allergies.join(',')}
            onChange={e =>
              setData({
                ...data!,
                allergies: e.target.value.split(',').map(s => s.trim()),
              })
            }
          />
        </div>
        <div>
          <label>Antécédents (JSON)</label><br />
          <textarea
            rows={4}
            value={JSON.stringify(data!.antecedents, null, 2)}
            onChange={e =>
              setData({
                ...data!,
                antecedents: JSON.parse(e.target.value),
              })
            }
          />
        </div>
        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  )
}
