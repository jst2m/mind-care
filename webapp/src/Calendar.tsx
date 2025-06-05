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
    date.setDate(baseDate.getDate() + i);
    return {
      label: days[i],
      date: `${date.getDate()}`,
      key: `${days[i]} ${date.getDate()}`,
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

// Réservations pour la semaine du 2 au 8 juin 2025
const initialReservations: Record<string, { name: string; reason: string }> = {
  'Lun 2 09:00': { name: 'Alice Dupont', reason: 'Suivi anxiété' },
  'Mar 3 15:00': { name: 'Luc Bernard', reason: 'Thérapie cognitive' },
  'Mer 4 10:00': { name: 'Claire Martin', reason: 'Consultation sommeil' },
  'Jeu 5 14:00': { name: 'Gabriel Noel', reason: 'Bilan initial' },
  'Ven 6 11:00': { name: 'Léa Petit', reason: 'Suivi hebdomadaire' },
  'Sam 7 10:00': { name: 'Maxime Leroy', reason: 'Crise panique' },
};

const Calendar: React.FC = () => {
  const [startDate, setStartDate] = useState(new Date('2025-06-02'));
  const { monthYear, daysList } = generateDays(startDate);
  const [reservations, setReservations] = useState(initialReservations);
  const [selectedSlotKey, setSelectedSlotKey] = useState<string | null>(null);

  const handlePrev = () => {
    const newStart = new Date(startDate);
    newStart.setDate(newStart.getDate() - 7);
    setStartDate(newStart);
    setSelectedSlotKey(null);
  };

  const handleNext = () => {
    const newStart = new Date(startDate);
    newStart.setDate(newStart.getDate() + 7);
    setStartDate(newStart);
    setSelectedSlotKey(null);
  };

  const handleSlotClick = (label: string, day: string, time: string) => {
    const key = `${label} ${day} ${time}`;
    if (reservations[key]) {
      setSelectedSlotKey(key);
    } else {
      setSelectedSlotKey(null);
    }
  };

  const handleCancel = () => {
    if (!selectedSlotKey) return;
    const updated = { ...reservations };
    delete updated[selectedSlotKey];
    setReservations(updated);
    setSelectedSlotKey(null);
  };

  const handleConfirm = () => {
    alert('Rendez-vous confirmé !');
    setSelectedSlotKey(null);
  };

  const timeSlots = generateTimes();

  return (
    <div className="calendar-wrapper">
      <button className="nav-button" onClick={handlePrev}>←</button>
      <div className="calendar">
        <h3 className="calendar-month">{monthYear}</h3>

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
                    disabled={!isReserved}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {selectedSlotKey && reservations[selectedSlotKey] && (
          <div className="slot-info">
            <span>
              <strong>{reservations[selectedSlotKey].name}</strong> – {reservations[selectedSlotKey].reason}
            </span>
            <div className="slot-actions">
              <button className="confirm-btn" onClick={handleConfirm}>✔</button>
              <button className="cancel-btn" onClick={handleCancel}>✖</button>
            </div>
          </div>
        )}
      </div>
      <button className="nav-button" onClick={handleNext}>→</button>
    </div>
  );
};

export default Calendar;
