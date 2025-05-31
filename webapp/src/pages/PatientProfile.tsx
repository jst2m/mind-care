import { useEffect, useState } from 'react'
import { apiFetch } from '../api'
import NavBar from '../components/Navbar'

type Patient = {
  uuid: string
  email: string
  prenom: string
  nom: string
  dateNaissance?: string
  telephone?: string
  adresse?: string
  codePostal?: string
  ville?: string
}

export default function PatientProfile() {
  const [patient, setPatient] = useState<Patient | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError]     = useState<string>()

  // Chargement initial
  useEffect(() => {
    setLoading(true)
    apiFetch<Patient>('/patient')
      .then(data => setPatient(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const updateField = (field: keyof Patient, value: string) => {
    if (!patient) return
    setPatient({ ...patient, [field]: value })
  }

  // Envoi du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await apiFetch('/patient', {
        method: 'PUT',
        body: JSON.stringify(patient),
      })
      alert('Profil mis à jour ✅')
    } catch (err: any) {
      alert('Erreur : ' + err.message)
    }
  }

  if (loading) return <div className="p-6 text-center">Chargement…</div>
  if (error)   return <div className="p-6 text-red-600">Erreur : {error}</div>
  if (!patient) return null

  return (
    <div className="w-screen min-h-screen bg-gray-50 font-serif">
      <NavBar />
      <div className="p-8">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 shadow-lg">
          <h1 className="text-3xl text-green-700 font-bold mb-6">Mon profil</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {[
              { label: 'Email',        name: 'email',   type: 'email' },
              { label: 'Prénom',       name: 'prenom',  type: 'text' },
              { label: 'Nom',          name: 'nom',     type: 'text' },
              { label: 'Date de naissance', name: 'dateNaissance', type: 'date' },
              { label: 'Téléphone',    name: 'telephone', type: 'text' },
              { label: 'Adresse',      name: 'adresse', type: 'text' },
              { label: 'Code postal',  name: 'codePostal', type: 'text' },
              { label: 'Ville',        name: 'ville',   type: 'text' },
            ].map(({ label, name, type }) => (
              <div key={name} className="flex flex-col">
                <label className="text-gray-600 mb-1 font-medium">{label}</label>
                <input
                  type={type}
                  value={patient[name as keyof Patient] || ''}
                  onChange={e => updateField(name as keyof Patient, e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                />
              </div>
            ))}
            <button
              type="submit"
              className="w-full bg-green-700 text-white font-semibold rounded-full py-3 hover:bg-green-800 transition"
            >
              Enregistrer
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
