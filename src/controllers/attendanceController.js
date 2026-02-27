import { getAttendanceByUser, saveAttendance } from "../models/attendance.js";
import { getUsers } from "../models/users.js";

export const getAttendance = (req, res) => {
  const requester = req.user;
  const targetUserId = req.params.userId
    ? parseInt(req.params.userId)
    : requester.id;

  const users = getUsers();
  const targetUser = users.find(u => u.id === targetUserId);

  if (!targetUser) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  //empleado
  if (requester.role === "employee") {
    if (targetUserId !== requester.id) {
      return res.status(403).json({ message: "No autorizado" });
    }
  }

  //jefe
  if (requester.role === "boss") {
    if (targetUserId === requester.id) {
    } else if (
      targetUser.role === "employee" &&
      targetUser.area.toLowerCase() === requester.area.toLowerCase()
    ) {
    } else {
      return res.status(403).json({ message: "No autorizado" });
    }
  }

  //admin acceso total
  const data = getAttendanceByUser(targetUserId);
  if (!data) {
    return res.json({ userId: targetUserId, days: [] });
  }

  res.json(data);
};

export const updateAttendance = (req, res) => {
  const requester = req.user;
  const targetUserId = parseInt(req.params.userId);
  const { days } = req.body;

  const users = getUsers();
  const targetUser = users.find(u => u.id === targetUserId);

  if (!targetUser) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  //empleados
  if (requester.role === "employee") {
    return res.status(403).json({ message: "No autorizado" });
  }

  //jefes
  if (requester.role === "boss") {
    if (targetUserId === requester.id) {
    } else if (
      targetUser.role === "employee" &&
      targetUser.area.toLowerCase() === requester.area.toLowerCase()
    ) {
    } else {
      return res.status(403).json({ message: "No autorizado" });
    }
  }

  const updated = saveAttendance(targetUserId, days);
  res.json(updated);
};