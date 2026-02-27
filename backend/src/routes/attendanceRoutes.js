import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { getAttendance, updateAttendance } from "../controllers/attendanceController.js";

const router = express.Router();

router.get("/me", verifyToken, getAttendance);
router.get("/:userId", verifyToken, getAttendance);
router.post("/:userId", verifyToken, updateAttendance);

export default router;