import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
  getTeamAttendance,
  updateTeamAttendance
} from "../controllers/teamAttendanceController.js";

const router = express.Router();

router.get("/", verifyToken, getTeamAttendance);
router.post("/:userId", verifyToken, updateTeamAttendance);

export default router;