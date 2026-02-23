import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { users } from "../models/users.js";

const SECRET_KEY = "stepover_secret"; //ejemplo xq deberia ser mas segura

export const login = async (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);
  if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(401).json({ message: "Contraseña incorrecta" });

  const token = jwt.sign(
    { id: user.id, role: user.role },
    SECRET_KEY,
    { expiresIn: "1h" }
  );

  res.json({ token });
};