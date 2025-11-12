import { useState } from "react";
import { foods } from "../data/foods";

export default function MyMenu() {
  const days = ["Lun", "Mar", "Mié", "Jue", "Vie"];

  const [menu, setMenu] = useState(
    days.reduce((acc, d) => ({ ...acc, [d]: foodOptions[0] }), {})
  );

  const handleChange = (day, value) => {
    setMenu((prev) => ({ ...prev, [day]: value }));
  };

  return (
    <div className="menu-week">
      <h2>Mi menú semanal</h2>
      {days.map((day) => (
        <div key={day} className="menu-day">
          <label>{day}:</label>
          <select
            value={menu[day]}
            onChange={(e) => handleChange(day, e.target.value)}
          >
            {foodOptions.map((option, i) => (
              <option key={i}>{option}</option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}
