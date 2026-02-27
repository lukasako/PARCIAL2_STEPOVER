import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getMyAttendance } from "../services/attendanceService";
import WeeklyCalendar from "../components/WeeklyCalendar";
import MenuSelection from "../components/MenuSelection";
import "../styles/panel.css";

export default function EmployeePage() {
  const { user } = useAuth();

  const [attendanceDays, setAttendanceDays] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance = async () => {
    try {
      const data = await getMyAttendance();
      setAttendanceDays(data.days || []);
    } catch (error) {
      console.error("Error cargando asistencia", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Cargando panel...</p>;

  return (
    <div className="page-container">
      <h1>Panel del Empleado</h1>

      <section>
        <h2>Mis días de asistencia</h2>
        <WeeklyCalendar initialDays={attendanceDays} readOnly />
      </section>

      <section>
        <MenuSelection
          user={user}
          attendanceDays={attendanceDays}
        />
      </section>
    </div>
  );
}