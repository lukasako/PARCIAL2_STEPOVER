import { getUsers } from "../models/users.js";

export const getAllUsers = (req, res) => {
  const users = getUsers();
  res.json(users);
};

export const getTeamUsers = (req, res) => {
  const requester = req.user;
  const users = getUsers();

  if (requester.role === "admin") {
    return res.json(users);
  }

  if (requester.role === "boss") {
    const team = users.filter(
      (u) =>
        u.role === "employee" &&
        u.area &&
        requester.area &&
        u.area.toLowerCase() === requester.area.toLowerCase()
    );

    return res.json(team);
  }

  return res.status(403).json({ message: "No autorizado" });
};