import MenuSelection from "../components/MenuSelection";
import WeeklyCalendar from "../components/WeeklyCalendar";
import { useAuth } from "../context/AuthContext";
import { useAttendance } from "../context/AttendanceContext";
import "../styles/panel.css";

export default function EmployeePage() {
  const { user } = useAuth();
  const { attendanceData } = useAttendance();
  const myDays = attendanceData[user.id]?.days || [];

  return (
    <div className="page-container">
      <h1>Panel del Empleado</h1>

      <section>
        <h2>Mis días de asistencia</h2>
        <WeeklyCalendar initialDays={myDays} readOnly />
      </section>

      <section>
        <MenuSelection user={user} />
      </section>
    </div>
  );
}
