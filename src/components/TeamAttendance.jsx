import { useAttendance } from "../context/AttendanceContext";
import WeeklyCalendar from "./WeeklyCalendar";
import { users } from "../data/users";

export default function TeamAttendance({ boss }) {
  const { attendanceData, updateAttendance } = useAttendance();
  const team = users.filter(
    (u) => u.area === boss.area && u.role === "employee"
  );

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
                  initialDays={attendanceData[emp.id]?.days || []}
                  onChange={(days) => updateAttendance(emp.id, days)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
