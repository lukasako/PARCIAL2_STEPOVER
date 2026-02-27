import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import WeeklyCalendar from "../components/WeeklyCalendar";
import TeamAttendance from "../components/TeamAttendance";
import MenuSelection from "../components/MenuSelection";
import {
  getMyAttendance,
  updateAttendance,
} from "../services/attendanceService";
import "../styles/panel.css";

export default function BossPage() {
  const { user } = useAuth();

  const [myDays, setMyDays] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMyAttendance();
  }, []);

  const loadMyAttendance = async () => {
    try {
      const data = await getMyAttendance();
      setMyDays(data.days || []);
    } catch (error) {
      console.error("Error cargando asistencia", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (days) => {
    try {
      await updateAttendance(user.id, days);
      setMyDays(days);
    } catch (error) {
      console.error("Error actualizando asistencia", error);
    }
  };

  if (loading) return <p>Cargando panel...</p>;

  return (
    <div className="page-container">
      <h1>Panel del Jefe</h1>

      <section>
        <h2>Mi asistencia semanal</h2>
        <WeeklyCalendar
          initialDays={myDays}
          onChange={handleUpdate}
        />
      </section>

      <section>
        <MenuSelection
          user={user}
          attendanceDays={myDays}
        />
      </section>

      <section>
        <TeamAttendance boss={user} />
      </section>
    </div>
  );
}