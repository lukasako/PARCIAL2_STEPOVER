import express from "express";
import { verifyToken, verifyAdmin } from "../middleware/authMiddleware.js";
import {
  getAllUsers,
  getUserById,
  getTeamUsers,
  createUser,
  updateUser,
  deleteUser
} from "../controllers/userController.js";

const router = express.Router();

router.use(verifyToken, verifyAdmin);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/team", verifyToken, getTeamUsers);

export default router;