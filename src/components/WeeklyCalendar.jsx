import { useState, useEffect } from "react";

export default function WeeklyCalendar({
  initialDays = [],
  onChange,
  userRole,
}) {
  const [selectedDays, setSelectedDays] = useState(initialDays);
  const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
  const isReadOnly = userRole === "employee";

  useEffect(() => {
    setSelectedDays(initialDays);
  }, [initialDays]);

  const toggleDay = (day) => {
    if (isReadOnly) return;
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
            isReadOnly ? "readonly" : ""
          }`}
          onClick={() => toggleDay(day)}
          disabled={isReadOnly}
        >
          {day}
        </button>
      ))}
    </div>
  );
}
