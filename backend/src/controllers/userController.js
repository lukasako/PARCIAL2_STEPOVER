import { getUsers } from "../models/users.js";
import { getRoles } from "../models/roles.js";
import { getAreas } from "../models/areas.js";
import bcrypt from "bcryptjs";

const generateId = (users) => {
  const ids = users.map(u => u.id);
  let newId = 1;
  while (ids.includes(newId)) {
    newId++;
  }
  return newId;
};

export const getAllUsers = (req, res) => {
  res.json(getUsers());
};

export const getUserById = (req, res) => {
  const users = getUsers();
  const user = users.find(u => u.id === parseInt(req.params.id));

  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  res.json(user);
};

export const createUser = async (req, res) => {
  const { username, password, name, role, area } = req.body;

  if (!username || !password || !name || !role || !area) {
    return res.status(400).json({ message: "Datos incompletos" });
  }

  const users = getUsers();

  if (users.some(u => u.username === username)) {
    return res.status(400).json({ message: "Username ya existe" });
  }

  if (!getRoles().includes(role)) {
    return res.status(400).json({ message: "Rol inválido" });
  }

  if (!getAreas().includes(area)) {
    return res.status(400).json({ message: "Área inválida" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: generateId(users),
    username,
    password: hashedPassword,
    name,
    role,
    area
  };

  users.push(newUser);

  res.status(201).json(newUser);
};

export const updateUser = async (req, res) => {
  const users = getUsers();
  const user = users.find(u => u.id === parseInt(req.params.id));

  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  const { username, password, name, role, area } = req.body;

  if (role && !getRoles().includes(role)) {
    return res.status(400).json({ message: "Rol inválido" });
  }

  if (area && !getAreas().includes(area)) {
    return res.status(400).json({ message: "Área inválida" });
  }

  if (username) user.username = username;
  if (name) user.name = name;
  if (role) user.role = role;
  if (area) user.area = area;

  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }

  res.json(user);
};

export const deleteUser = (req, res) => {
  const users = getUsers();
  const index = users.findIndex(u => u.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  users.splice(index, 1);

  res.json({ message: "Usuario eliminado" });
};

export const getTeamUsers = (req, res) => {
  const requester = req.user;
  const users = getUsers();

  if (requester.role === "admin") {
    return res.json(users);
  }

  if (requester.role === "boss") {
    const team = users.filter(
      (u) => u.area === requester.area && u.role === "employee"
    );
    return res.json(team);
  }

  return res.status(403).json({ message: "No autorizado" });
};