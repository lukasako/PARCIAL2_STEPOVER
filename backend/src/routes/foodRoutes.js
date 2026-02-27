import express from "express";
import { getAllFoods } from "../controllers/foodController.js";
import { verifyToken, verifyAdmin } from "../middleware/authMiddleware.js";
import { getFoods } from "../models/foods.js";

const router = express.Router();

//get con autenticacion
router.get("/", verifyToken, getAllFoods);

//solo admin
router.post("/", verifyToken, verifyAdmin, (req, res) => {
  const { food } = req.body;
  if (!food || food.trim() === "") {
    return res.status(400).json({ message: "Comida inválida" });
  }

  const foods = getFoods();
  if (foods.includes(food)) {
    return res.status(400).json({ message: "La comida ya existe" });
  }

  foods.push(food);
  res.status(201).json(foods);
});

//solo admin
router.delete("/", verifyToken, verifyAdmin, (req, res) => {
  const { food } = req.body;
  const foods = getFoods();

  if (!food || !foods.includes(food)) {
    return res.status(404).json({ message: "Comida no encontrada" });
  }
  if (food === "No pedir comida") {
    return res.status(400).json({
      message: "No se puede eliminar 'No pedir comida'"
    });
  }

  const index = foods.indexOf(food);
  foods.splice(index, 1);
  res.json(foods);
});

export default router;