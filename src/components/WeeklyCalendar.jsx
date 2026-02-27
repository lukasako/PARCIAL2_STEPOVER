import { useState, useEffect } from "react";

export default function WeeklyCalendar({
  initialDays = [],
  onChange,
  readOnly = false,
}) {
  const [selectedDays, setSelectedDays] = useState(initialDays);

  const daysOfWeek = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];

  useEffect(() => {
    setSelectedDays(initialDays);
  }, [initialDays]);

  const toggleDay = (day) => {
    if (readOnly) return;

    const updatedDays = selectedDays.includes(day)
      ? selectedDays.filter((d) => d !== day)
      : [...selectedDays, day];

    setSelectedDays(updatedDays);
    onChange?.(updatedDays);
  };

  return (
    <div className="weekly-calendar">
      {daysOfWeek.map((day) => (
        <button
          key={day}
          className={`day ${selectedDays.includes(day) ? "active" : ""} ${
            readOnly ? "readonly" : ""
          }`}
          onClick={() => toggleDay(day)}
          disabled={readOnly}
        >
          {day}
        </button>
      ))}
    </div>
  );
}