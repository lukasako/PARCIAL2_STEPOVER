import { useEffect, useState } from "react";
import WeeklyCalendar from "./WeeklyCalendar";
import { getUsers } from "../services/userService";
import {
  getAttendanceByUser,
  updateAttendance,
} from "../services/attendanceService";

export default function TeamAttendance({ boss }) {
  const [team, setTeam] = useState([]);
  const [attendanceMap, setAttendanceMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTeam();
  }, []);

  const loadTeam = async () => {
    try {
      const users = await getUsers();

      const filtered = users.filter(
        (u) => u.area === boss.area && u.role === "employee"
      );

      setTeam(filtered);

      const attendanceData = {};

      for (const emp of filtered) {
        const data = await getAttendanceByUser(emp.id);
        attendanceData[emp.id] = data.days || [];
      }

      setAttendanceMap(attendanceData);
    } catch (error) {
      console.error("Error cargando equipo", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (userId, days) => {
    try {
      await updateAttendance(userId, days);
      setAttendanceMap((prev) => ({
        ...prev,
        [userId]: days,
      }));
    } catch (error) {
      console.error("Error actualizando asistencia", error);
    }
  };

  if (loading) return <p>Cargando equipo...</p>;

  return (
    <div>
      <h2>Asistencia de mi equipo ({boss.area})</h2>
      <table>
        <thead>
          <tr>
            <th>Empleado</th>
            <th>Días de asistencia</th>
          </tr>
        </thead>
        <tbody>
          {team.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.name}</td>
              <td>
                <WeeklyCalendar
                  initialDays={attendanceMap[emp.id] || []}
                  onChange={(days) => handleUpdate(emp.id, days)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}