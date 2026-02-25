import express from "express";
import { verifyToken, verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/admin-data", verifyToken, verifyAdmin, (req, res) => {
  res.json({ message: "Datos solo para admin" });
});

router.get("/user-data", verifyToken, (req, res) => {
  res.json({ message: "Datos para usuario autenticado" });
});

export default router;