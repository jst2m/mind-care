import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

interface SignupForm {
  email: string;
  motDePasse: string;
  prenom: string;
  nom: string;
  sexe: 'Homme' | 'Femme' | 'Ne préfère pas dire' | '';
  dateNaissance: string;
  role: 'patient' | 'professionnel';
}

export default function Signup() {
  const [form, setForm] = useState<SignupForm>({
    email: '',
    motDePasse: '',
    prenom: '',
    nom: '',
    sexe: '',
    dateNaissance: '',
    role: 'patient',
  });
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value as any }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      console.log('Response:', res.status, data);
      if (res.ok) {
        setMessage('Inscription réussie ! Vous pouvez maintenant vous connecter.');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(
          Array.isArray(data.message)
            ? data.message.join(', ')
            : data.message || 'Une erreur est survenue.'
        );
      }
    } catch (err) {
      console.error(err);
      setError('Impossible de contacter le serveur.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Inscription</h1>
      {message && <div className="p-3 mb-4 text-green-800 bg-green-200 rounded">{message}</div>}
      {error && <div className="p-3 mb-4 text-red-800 bg-red-200 rounded">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          name="motDePasse"
          placeholder="Mot de passe"
          required
          minLength={6}
          value={form.motDePasse}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <div className="flex space-x-2">
          <input
            type="text"
            name="prenom"
            placeholder="Prénom"
            required
            value={form.prenom}
            onChange={handleChange}
            className="flex-1 p-2 border rounded"
          />
          <input
            type="text"
            name="nom"
            placeholder="Nom"
            required
            value={form.nom}
            onChange={handleChange}
            className="flex-1 p-2 border rounded"
          />
        </div>
        <div className="flex space-x-2">
          <select
            name="sexe"
            required
            value={form.sexe}
            onChange={handleChange}
            className="flex-1 p-2 border rounded"
          >
            <option value="">Sexe</option>
            <option value="Homme">Homme</option>
            <option value="Femme">Femme</option>
            <option value="Ne préfère pas dire">Ne préfère pas dire</option>
          </select>
          <input
            type="date"
            name="dateNaissance"
            value={form.dateNaissance}
            onChange={handleChange}
            className="flex-1 p-2 border rounded"
          />
        </div>
        <select
          name="role"
          required
          value={form.role}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="patient">Patient</option>
          <option value="professionnel">Professionnel</option>
        </select>

        <button
          type="submit"
          className="w-full py-2 font-semibold rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90"
        >
          S'inscrire
        </button>
      </form>
    </div>
  );
}
