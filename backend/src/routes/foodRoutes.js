import express from "express";
import { getAllFoods } from "../controllers/foodController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

//solo con autenticacion pueden acceder
router.get("/", verifyToken, getAllFoods);

export default router;