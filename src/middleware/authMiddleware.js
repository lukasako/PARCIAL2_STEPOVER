import jwt from "jsonwebtoken";

const SECRET_KEY = "stepover_secret";

export const verifyToken = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) return res.status(403).json({ message: "Token requerido" });

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido" });
  }
};

export const verifyAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Acceso solo para administradores" });
  }
  next();
};