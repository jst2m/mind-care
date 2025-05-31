// src/pages/Appointments.tsx
import { useEffect, useState } from 'react'
import { apiFetch } from '../api'
import NavBar from '../components/Navbar'

type Rdv = { id:number; scheduled_at:string; status:string; pro_uuid:string }

export default function Appointments() {
  const [rdvs, setRdvs] = useState<Rdv[]>([])
  const [error, setError] = useState<string>()

  useEffect(() => {
    apiFetch<Rdv[]>('/rendez-vous').then(setRdvs).catch(e=>setError(e.message))
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Mes rendez-vous</h1>
      {error && <div className="text-red-500">{error}</div>}
      <ul className="mt-4 space-y-2">
        {rdvs.map(r => (
          <li key={r.id} className="border p-2 rounded">
            <div>Date : {new Date(r.scheduled_at).toLocaleString()}</div>
            <div>Statut : {r.status}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
