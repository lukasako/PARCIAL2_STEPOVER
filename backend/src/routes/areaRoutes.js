import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminOnly.js";
import { getAreas, addArea, deleteArea } from "../models/areas.js";

const router = express.Router();

router.use(verifyToken, adminOnly);

router.get("/", (req, res) => {
  res.json(getAreas());
});

router.post("/", (req, res) => {
  const { area } = req.body;
  if (!area) return res.status(400).json({ message: "Área requerida" });
  res.json(addArea(area));
});

router.delete("/", (req, res) => {
  const { area } = req.body;
  res.json(deleteArea(area));
});

export default router;