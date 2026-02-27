import express from "express";
import { verifyToken, verifyAdmin } from "../middleware/authMiddleware.js";
import {
  getAllUsers,
  getTeamUsers
} from "../controllers/userController.js";

const router = express.Router();

router.get("/team", verifyToken, getTeamUsers);

router.get("/", verifyToken, verifyAdmin, getAllUsers);

export default router;