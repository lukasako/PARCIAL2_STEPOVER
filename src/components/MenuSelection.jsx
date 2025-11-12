import { useAttendance } from "../context/AttendanceContext";
import { useEffect, useState } from "react";

export default function MenuSelection({ user }) {
  const { attendanceData, updateMenu } = useAttendance();
  const userId = user.id;

  const userDays = attendanceData[userId]?.days || [];

  const [menus, setMenus] = useState(attendanceData[userId]?.menus || {});

  const mealOptions = [
    "No pedir comida",
    "Sanguche de milanesa con bebida",
    "Milanesa de pollo con ensalada",
    "Ensalada Caesar con pollo a la plancha",
    "Wok de vegetales con tofu (vegano)",
    "Hamburguesa de lentejas (vegano)",
    "Fideos de arroz con verduras (celíaco)",
    "Tarta de espinaca y calabaza (celíaco)",
  ];

  const handleChange = (day, meal) => {
    const updatedMenus = { ...menus, [day]: meal };
    setMenus(updatedMenus);
    updateMenu(userId, updatedMenus);
  };

  useEffect(() => {
    if (attendanceData[userId]?.menus) {
      setMenus(attendanceData[userId].menus);
    }
  }, [attendanceData, userId]);

  return (
    <div>
      <h2>Mi menú semanal</h2>

      {userDays.length === 0 ? (
        <p style={{ color: "#666" }}>
          No tenés días de asistencia asignados. Seleccionalos en el calendario.
        </p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Día</th>
              <th>Comida</th>
            </tr>
          </thead>
          <tbody>
            {userDays.map((day) => (
              <tr key={day}>
                <td>{day}</td>
                <td>
                  <select
                    value={menus[day] || "No pedir comida"}
                    onChange={(e) => handleChange(day, e.target.value)}
                  >
                    {mealOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
