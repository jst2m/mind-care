import React, { useEffect, useState } from 'react';
import './Messages.css';

type Message = {
  sender: 'me' | 'patient';
  content: string;
};

type Patient = {
  id: number;
  name: string;
};

const Messages: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/utilisateur/patients')
      .then((res) => res.json())
      .then((data) => setPatients(data))
      .catch((err) => console.error('Erreur chargement patients', err));
  }, []);

  const handlePatientClick = async (patient: Patient) => {
    setSelectedPatient(patient);
    setSearchOpen(false);
    setSearchTerm('');

    try {
      const res = await fetch(`http://localhost:3000/messages/${patient.id}`);
      const data = await res.json();
      setMessages(data);
    } catch (error) {
      console.error('Erreur chargement messages', error);
    }
  };

  const handleSend = async () => {
    if (!newMessage.trim() || !selectedPatient) return;

    const sent: Message = { sender: 'me', content: newMessage };
    setMessages((prev) => [...prev, sent]);

    try {
      await fetch('http://localhost:3000/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destinataireId: selectedPatient.id,
          contenu: newMessage,
        }),
      });
    } catch (err) {
      console.error('Erreur envoi message', err);
    }

    setNewMessage('');
  };

  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="messages-container">
      <div className="sidebar">
        <h3>Mes patients</h3>
        <ul>
          {patients.map((patient) => (
            <li
              key={patient.id}
              className={selectedPatient?.id === patient.id ? 'active' : ''}
              onClick={() => handlePatientClick(patient)}
            >
              {patient.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="chat-section">
        {selectedPatient ? (
          <>
            <div className="chat-header">Conversation avec {selectedPatient.name}</div>
            <div className="chat-messages">
              {messages.map((msg, index) => (
                <div key={index} className={`chat-bubble ${msg.sender}`}>
                  {msg.content}
                </div>
              ))}
            </div>
            <div className="chat-input">
              <input
                type="text"
                placeholder="Écrire un message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button onClick={handleSend}>Envoyer</button>
            </div>
          </>
        ) : (
          <div className="no-selection">Sélectionnez un patient pour commencer à discuter</div>
        )}
      </div>

      {/* ➕ Bouton flottant pour nouvelle conversation */}
      <button
        className="new-convo-btn"
        onClick={() => setSearchOpen(!searchOpen)}
        title="Nouvelle conversation"
      >
        +
      </button>

      {searchOpen && (
        <div className="search-box">
          <input
            type="text"
            placeholder="Rechercher un patient..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ul>
            {filteredPatients.length === 0 ? (
              <li className="no-result">Aucun résultat</li>
            ) : (
              filteredPatients.map((p) => (
                <li key={p.id} onClick={() => handlePatientClick(p)}>
                  {p.name}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Messages;
