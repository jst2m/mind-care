import React, { useState } from 'react';
import '../styles/Messages.css';

type Message = {
  sender: 'me' | 'patient';
  content: string;
};

type Patient = {
  id: number;
  name: string;
};

const dummyPatients: Patient[] = [
  { id: 1, name: 'Maria Solis' },
  { id: 2, name: 'Gabriel Martin' },
  { id: 3, name: 'Susanne Bernard' },
];

const dummyMessages: Record<number, Message[]> = {
  1: [
    { sender: 'patient', content: 'Bonjour docteur' },
    { sender: 'me', content: 'Bonjour Alice, comment allez-vous ?' },
  ],
  2: [
    { sender: 'patient', content: 'J’ai besoin d’un rendez-vous' },
  ],
  3: [],
};

const getAutomatedResponse = (input: string): string => {
  const msg = input.toLowerCase();

  if (msg.includes('comment') && msg.includes('va')) {
    return "Je vais bien merci, et vous ?";
  } else if (msg.includes('rendez-vous')) {
    return "Oui, bien sûr. Je peux vous proposer un créneau cette semaine.";
  } else if (msg.includes('merci')) {
    return "Avec plaisir 😊";
  } else if (msg.includes('bonjour') || msg.includes('salut')) {
    return "Bonjour docteur !";
  } else if (msg.includes('disponible')) {
    return "Je suis disponible en fin de journée.";
  } else if (msg.includes('douleur') || msg.includes('mal')) {
    return "Je suis désolé d’entendre ça, pouvez-vous m’en dire plus ?";
  }

  return "D'accord, je prends note.";
};

const Messages: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const handlePatientClick = (patient: Patient) => {
    setSelectedPatient(patient);
    setMessages(dummyMessages[patient.id] || []);
  };

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const sent = { sender: 'me', content: newMessage };
    const reply = { sender: 'patient', content: getAutomatedResponse(newMessage) };

    setMessages(prev => [...prev, sent]);
    setNewMessage('');

    setTimeout(() => {
      setMessages(prev => [...prev, reply]);
    }, 1500);
  };

  return (
    <div className="messages-container">
      <div className="sidebar">
        <h3>Mes patients</h3>
        <ul>
          {dummyPatients.map(patient => (
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
    </div>
  );
};

export default Messages;
