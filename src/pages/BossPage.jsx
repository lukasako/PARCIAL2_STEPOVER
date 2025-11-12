import WeeklyCalendar from "../components/WeeklyCalendar";
import TeamAttendance from "../components/TeamAttendance";
import MenuSelection from "../components/MenuSelection";
import { useAuth } from "../context/AuthContext";
import { useAttendance } from "../context/AttendanceContext";
import "../styles/panel.css";

export default function BossPage() {
  const { user } = useAuth();
  const { attendanceData, updateAttendance } = useAttendance();

  const myDays = attendanceData[user.id]?.days || [];

  return (
    <div className="page-container">
      <h1>Panel del Jefe</h1>

      <section>
        <h2>Mi asistencia semanal</h2>
        <WeeklyCalendar
          initialDays={myDays}
          onChange={(days) => updateAttendance(user.id, days)}
        />
      </section>

      <section>
        <MenuSelection user={user} />
      </section>

      <section>
        <TeamAttendance boss={user} />
      </section>
    </div>
  );
}
