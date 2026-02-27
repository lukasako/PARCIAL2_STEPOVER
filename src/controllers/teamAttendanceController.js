import { getUsers } from "../models/users.js";
import { getAttendanceByUser, saveAttendance } from "../models/attendance.js";

const validDays = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

export const getTeamAttendance = (req, res) => {
  const requester = req.user;
  const users = getUsers();

  //empleado solo sus dias
  if (requester.role === "employee") {
    const attendance = getAttendanceByUser(requester.id);
    return res.json({
      userId: requester.id,
      days: attendance ? attendance.days : []
    });
  }

  //boss unicamente de su area
  if (requester.role === "boss") {

    const team = users.filter(u =>
      u.role === "employee" &&
      u.area &&
      requester.area &&
      u.area.toLowerCase() === requester.area.toLowerCase()
    );

    const result = team.map(user => {
      const attendance = getAttendanceByUser(user.id);
      return {
        userId: user.id,
        name: user.name,
        days: attendance ? attendance.days : []
      };
    });

    return res.json(result);
  }

  //admin ve todo
  if (requester.role === "admin") {

    const result = users.map(user => {
      const attendance = getAttendanceByUser(user.id);
      return {
        userId: user.id,
        name: user.name,
        role: user.role,
        area: user.area,
        days: attendance ? attendance.days : []
      };
    });

    return res.json(result);
  }
};

export const updateTeamAttendance = (req, res) => {
  const requester = req.user;
  const targetUserId = parseInt(req.params.userId);
  const { days } = req.body;

  const users = getUsers();
  const targetUser = users.find(u => u.id === targetUserId);

  if (!targetUser) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  if (!Array.isArray(days)) {
    return res.status(400).json({ message: "Formato inválido" });
  }

  //dias validos
  for (const day of days) {
    if (!validDays.includes(day)) {
      return res.status(400).json({
        message: `Día inválido: ${day}`
      });
    }
  }

  //empleado no puede modificar
  if (requester.role === "employee") {
    return res.status(403).json({ message: "No autorizado" });
  }

  //boss modifica de su area
  if (requester.role === "boss") {

    if (
      targetUser.role !== "employee" ||
      !targetUser.area ||
      !requester.area ||
      targetUser.area.toLowerCase() !== requester.area.toLowerCase()
    ) {
      return res.status(403).json({ message: "No autorizado" });
    }
  }

  //admin acceso total
  const updated = saveAttendance(targetUserId, days);
  res.json(updated);
};