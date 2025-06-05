import React, { useState } from 'react';
import './Calendar.css';

const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

const generateDays = (start: Date) => {
  const monthYear = start.toLocaleString('fr-FR', {
    month: 'long',
    year: 'numeric',
  });

  const daysList = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(start);
    date.setDate(date.getDate() + i);
    return {
      label: days[date.getDay() === 0 ? 6 : date.getDay() - 1],
      date: `${date.getDate()}`,
      key: `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`,
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

// Réservations spécifiques à la semaine du 05/06/2025
const reservedSlots: Record<string, { name: string; reason: string }> = {
  'Mer 5 09:00': { name: 'Alice Dupont', reason: 'Suivi anxiété' },
  'Mer 5 15:00': { name: 'Luc Bernard', reason: 'Thérapie cognitive' },
  'Jeu 6 10:00': { name: 'Claire Martin', reason: 'Consultation sommeil' },
  'Ven 7 14:00': { name: 'Gabriel Noel', reason: 'Bilan initial' },
  'Sam 8 11:00': { name: 'Léa Petit', reason: 'Suivi hebdomadaire' },
  'Dim 9 16:00': { name: 'Maxime Leroy', reason: 'Crise panique' },
};

const Calendar: React.FC = () => {
  const [startDate, setStartDate] = useState(new Date('2025-06-05'));
  const { monthYear, daysList } = generateDays(startDate);
  const times = generateTimes();
  const [selectedInfo, setSelectedInfo] = useState<null | string>(null);

  const handlePrev = () => {
    const newStart = new Date(startDate);
    newStart.setDate(newStart.getDate() - 7);
    setStartDate(newStart);
    setSelectedInfo(null);
  };

  const handleNext = () => {
    const newStart = new Date(startDate);
    newStart.setDate(newStart.getDate() + 7);
    setStartDate(newStart);
    setSelectedInfo(null);
  };

  const handleSlotClick = (label: string, day: string, time: string) => {
    const key = `${label} ${day} ${time}`;
    if (reservedSlots[key]) {
      setSelectedInfo(`${reservedSlots[key].name} – ${reservedSlots[key].reason}`);
    } else {
      setSelectedInfo(null);
    }
  };

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
          {times.map((time, idx) => (
            <div key={idx} className="calendar-row">
              {daysList.map((day, colIdx) => {
                const slotKey = `${day.label} ${day.date} ${time}`;
                const isReserved = reservedSlots[slotKey];

                return (
                  <button
                    key={colIdx}
                    className={`slot ${isReserved ? 'reserved' : 'available'}`}
                    onClick={() => handleSlotClick(day.label, day.date, time)}
                    disabled={!!isReserved}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {selectedInfo && (
          <div className="slot-info">
            <span>{selectedInfo}</span>
            <button className="confirm-btn">✔</button>
            <button className="cancel-btn">✖</button>
          </div>
        )}
      </div>
      <button className="nav-button" onClick={handleNext}>→</button>
    </div>
  );
};

export default Calendar;
