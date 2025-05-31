import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginForm {
  email: string;
  motDePasse: string;
}

export default function Login() {
  const [form, setForm] = useState<LoginForm>({
    email: '',
    motDePasse: '',
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      console.log('Response:', res.status, data);

      if (res.ok && data.accessToken) {
        // Stocke le token JWT sous la clé accessToken
        localStorage.setItem('accessToken', data.accessToken);
        // Redirection vers le dashboard ou page d'accueil
        navigate('/dashboard');
      } else {
        setError(data.message || 'Identifiants invalides.');
      }
    } catch (err) {
      console.error(err);
      setError('Impossible de contacter le serveur.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Connexion</h1>
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
          value={form.motDePasse}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full py-2 font-semibold rounded-xl bg-gradient-to-r from-green-500 to-blue-500 text-white hover:opacity-90"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
}
