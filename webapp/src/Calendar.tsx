import React, { useState } from 'react';
import './Calendar.css';

const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

const getStartOfWeek = (date: Date) => {
  const copiedDate = new Date(date);
  const day = copiedDate.getDay();
  const diff = (day === 0 ? -6 : 1) - day;
  copiedDate.setDate(copiedDate.getDate() + diff);
  return copiedDate;
};

const generateDays = (start: Date) => {
  const baseDate = getStartOfWeek(start);
  const monthYear = baseDate.toLocaleString('fr-FR', {
    month: 'long',
    year: 'numeric',
  });

  const daysList = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(baseDate);
    date.setDate(date.getDate() + i);
    return {
      label: days[i],
      date: `${date.getDate()}`,
    };
  });

  return { monthYear, daysList };
};

const generateTimes = () => {
  const times = [];
  for (let h = 8; h <= 18; h++) {
    times.push(`${String(h).padStart(2, '0')}:00`);
  }
  return times;
};

const initialReservations: Record<string, { name: string; reason: string }> = {
  'Jeu 5 09:00': { name: 'Alice Dupont', reason: 'Suivi anxiété' },
  'Jeu 5 15:00': { name: 'Luc Bernard', reason: 'Thérapie cognitive' },
  'Ven 6 10:00': { name: 'Claire Martin', reason: 'Consultation sommeil' },
  'Ven 6 14:00': { name: 'Gabriel Noel', reason: 'Bilan initial' },
  'Sam 7 11:00': { name: 'Léa Petit', reason: 'Suivi hebdomadaire' },
  'Lun 9 16:00': { name: 'Maxime Leroy', reason: 'Crise panique' },
};

const Calendar: React.FC = () => {
  const [startDate, setStartDate] = useState(new Date('2025-06-05'));
  const { monthYear, daysList } = generateDays(startDate);
  const [reservations, setReservations] = useState(initialReservations);
  const [selectedSlotKey, setSelectedSlotKey] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedReason, setEditedReason] = useState('');
  const [isNew, setIsNew] = useState(false);

  const handlePrev = () => {
    const newStart = new Date(startDate);
    newStart.setDate(newStart.getDate() - 7);
    setStartDate(newStart);
    resetSelection();
  };

  const handleNext = () => {
    const newStart = new Date(startDate);
    newStart.setDate(newStart.getDate() + 7);
    setStartDate(newStart);
    resetSelection();
  };

  const resetSelection = () => {
    setSelectedSlotKey(null);
    setIsEditing(false);
    setIsNew(false);
    setEditedName('');
    setEditedReason('');
  };

  const handleSlotClick = (label: string, day: string, time: string) => {
    const key = `${label} ${day} ${time}`;
    if (reservations[key]) {
      setSelectedSlotKey(key);
      setIsEditing(false);
      setIsNew(false);
    } else {
      setSelectedSlotKey(key);
      setEditedName('');
      setEditedReason('');
      setIsNew(true);
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    if (!selectedSlotKey) return;
    const updated = { ...reservations };
    delete updated[selectedSlotKey];
    setReservations(updated);
    resetSelection();
  };

  const handleConfirm = () => {
    alert("Rendez-vous confirmé !");
    resetSelection();
  };

  const handleEdit = () => {
    if (!selectedSlotKey || !reservations[selectedSlotKey]) return;
    const { name, reason } = reservations[selectedSlotKey];
    setEditedName(name);
    setEditedReason(reason);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (!selectedSlotKey || !editedName || !editedReason) return;
    setReservations({
      ...reservations,
      [selectedSlotKey]: {
        name: editedName,
        reason: editedReason,
      },
    });
    resetSelection();
  };

  const timeSlots = generateTimes();

  return (
    <div className="calendar-wrapper">
      <button className="nav-button" onClick={handlePrev}>←</button>
      <div className="calendar">
        <div className="calendar-title-banner">
  <h2>Votre espace planning</h2>
  <h3 className="calendar-month">{monthYear}</h3>
</div>


        <div className="calendar-header">
          {daysList.map((day, idx) => (
            <div key={idx} className="day-header">
              <div>{day.label}</div>
              <div>{day.date}</div>
            </div>
          ))}
        </div>

        <div className="calendar-body">
          {timeSlots.map((time) => (
            <div key={time} className="calendar-row">
              {daysList.map((day, colIdx) => {
                const isSunday = day.label === 'Dim';
                const isSaturdayAfternoon = day.label === 'Sam' && parseInt(time) > 12;

                if (isSunday || isSaturdayAfternoon) {
                  return <div key={colIdx} className="slot empty"></div>;
                }

                const slotKey = `${day.label} ${day.date} ${time}`;
                const isReserved = reservations[slotKey];

                return (
                  <button
                    key={colIdx}
                    className={`slot ${isReserved ? 'reserved' : 'available'}`}
                    onClick={() => handleSlotClick(day.label, day.date, time)}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {selectedSlotKey && (
          <div className="slot-info">
            {isEditing ? (
              <div className="edit-form">
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  placeholder="Nom"
                />
                <input
                  type="text"
                  value={editedReason}
                  onChange={(e) => setEditedReason(e.target.value)}
                  placeholder="Raison"
                />
                <div className="slot-actions">
                  <button className="confirm-btn" onClick={handleSaveEdit}>💾</button>
                  <button className="cancel-btn" onClick={resetSelection}>❌</button>
                </div>
              </div>
            ) : reservations[selectedSlotKey] ? (
              <>
                <span>
                  <strong>{reservations[selectedSlotKey].name}</strong> – {reservations[selectedSlotKey].reason}
                </span>
                <div className="slot-actions">
                  <button className="confirm-btn" onClick={handleConfirm}>✔</button>
                  <button className="cancel-btn" onClick={handleCancel}>✖</button>
                  <button className="edit-btn" onClick={handleEdit}>✎</button>
                </div>
              </>
            ) : null}
          </div>
        )}
      </div>
      <button className="nav-button" onClick={handleNext}>→</button>
    </div>
  );
};

export default Calendar;
