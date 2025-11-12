import { useState } from "react";

export default function MyAttendance() {
  const daysOfWeek = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
  const [attendance, setAttendance] = useState(
    Array(7).fill(false) // false = no asiste
  );

  const toggleDay = (index) => {
    const updated = [...attendance];
    updated[index] = !updated[index];
    setAttendance(updated);
  };

  return (
    <div className="attendance">
      <h2>Mi asistencia semanal</h2>
      <div className="days-grid">
        {daysOfWeek.map((day, i) => (
          <div
            key={i}
            className={`day-box ${attendance[i] ? "active" : ""}`}
            onClick={() => toggleDay(i)}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}
