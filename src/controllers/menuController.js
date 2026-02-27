import { getMenuByUser, saveMenu } from "../models/menus.js";
import { getUsers } from "../models/users.js";
import { getAttendanceByUser } from "../models/attendance.js";
import { getFoods } from "../models/foods.js";

export const getMenu = (req, res) => {
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

  //jefes
  if (requester.role === "boss") {

    if (targetUserId === requester.id) {
    }

    else if (
      targetUser.role === "employee" &&
      targetUser.area &&
      requester.area &&
      targetUser.area.toLowerCase() === requester.area.toLowerCase()
    ) {
    }

    else {
      return res.status(403).json({ message: "No autorizado" });
    }
  }

  const data = getMenuByUser(targetUserId);

  if (!data) {
    return res.json({ userId: targetUserId, selections: {} });
  }

  res.json(data);
};

export const updateMenu = (req, res) => {
  const requester = req.user;
  const targetUserId = parseInt(req.params.userId);
  const { selections } = req.body;

  const users = getUsers();
  const targetUser = users.find(u => u.id === targetUserId);

  if (!targetUser) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  if (!selections || typeof selections !== "object") {
    return res.status(400).json({ message: "Formato de menú inválido" });
  }

  //reglas para asignar
  if (requester.role === "employee") {
    if (targetUserId !== requester.id) {
      return res.status(403).json({ message: "No autorizado" });
    }
  }

  if (requester.role === "boss") {
    if (targetUserId !== requester.id) {
      return res.status(403).json({ message: "No autorizado" });
    }
  }

  //valida que tenga dias asignados
  const attendance = getAttendanceByUser(targetUserId);

  if (!attendance || !attendance.days || attendance.days.length === 0) {
    return res.status(400).json({
      message: "El usuario no tiene días asignados"
    });
  }

  const assignedDays = attendance.days;
  const availableFoods = getFoods();

  //solo dias asignados
  for (const day in selections) {

    if (!assignedDays.includes(day)) {
      return res.status(400).json({
        message: `No puede asignar comida a ${day} porque no está asignado`
      });
    }

    if (!availableFoods.includes(selections[day])) {
      return res.status(400).json({
        message: `Comida inválida para ${day}`
      });
    }
  }

  const finalSelections = {};

  assignedDays.forEach(day => {
    finalSelections[day] = selections[day] || "No pedir comida";
  });

  const updated = saveMenu(targetUserId, finalSelections);

  res.json(updated);
};