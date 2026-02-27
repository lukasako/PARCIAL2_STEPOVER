import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminOnly.js";
import { getRoles, addRole, deleteRole } from "../models/roles.js";

const router = express.Router();

router.use(verifyToken, adminOnly);

router.get("/", (req, res) => {
  res.json(getRoles());
});

router.post("/", (req, res) => {
  const { role } = req.body;
  if (!role) return res.status(400).json({ message: "Rol requerido" });
  res.json(addRole(role));
});

router.delete("/", (req, res) => {
  const { role } = req.body;
  res.json(deleteRole(role));
});

export default router;