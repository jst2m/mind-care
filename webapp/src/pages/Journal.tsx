import React, { useState } from 'react';
import NavBar from '../components/Navbar';

// Exemples d'entrées pour l'affichage
const sampleEntries = [
  { id: '1', date: '30/05/2025', mood: 7, notes: 'Je me suis senti calme après la méditation.' },
  { id: '2', date: '29/05/2025', mood: 4, notes: 'Journée stressante au travail.' },
];

export default function JournalScreen() {
  const [entries, setEntries] = useState(sampleEntries);
  const [mood, setMood] = useState('');
  const [notes, setNotes] = useState('');

  const addEntry = () => {
    if (!mood || isNaN(Number(mood))) {
      alert('Veuillez entrer une humeur valide.');
      return;
    }

    const newEntry = {
      id: String(entries.length + 1),
      date: new Date().toLocaleDateString('fr-FR'),
      mood: Number(mood),
      notes,
    };

    setEntries([newEntry, ...entries]);
    setMood('');
    setNotes('');
  };

  return (
    <div className="w-screen min-h-screen bg-gray-50 font-serif">
      <NavBar />
      <main className="w-screen p-6">
        <h1 className="text-4xl text-center text-green-700 font-bold mb-6">Journal Émotionnel</h1>

        <div className="w-screen flex flex-col lg:flex-row gap-8">
          {/* Liste des entrées */}
          <ul className="flex-1 space-y-4">
            {entries.map(item => (
              <li key={item.id} className="border border-gray-200 rounded-2xl p-4 bg-white shadow hover:shadow-lg transition">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-500 text-sm">{item.date}</span>
                  <span className="bg-green-100 px-2 py-1 rounded-full text-green-800 font-semibold">
                    Humeur : {item.mood}/10
                  </span>
                </div>
                <p className="text-green-600">{item.notes}</p>
              </li>
            ))}
          </ul>

          {/* Formulaire */}
          <div className="flex-1 bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl text-green-700 font-semibold mb-4">Nouvelle Entrée</h2>

            <label className="block text-sm font-medium text-gray-600 mb-1">Humeur (1–10)</label>
            <input
              type="number"
              min="1"
              max="10"
              value={mood}
              onChange={e => setMood(e.target.value)}
              className="w-full mb-4 border border-gray-300 rounded-lg p-2"
              placeholder="Ex : 7"
            />

            <label className="block text-sm font-medium text-gray-600 mb-1">Notes</label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="w-full h-24 mb-4 border border-gray-300 rounded-lg p-2"
              placeholder="Écrivez vos pensées..."
            />

            <button
              onClick={addEntry}
              className="w-full bg-green-700 text-white font-semibold rounded-full py-3 hover:bg-green-800 transition"
            >
              Ajouter
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
