import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { getMenu, updateMenu } from "../controllers/menuController.js";

const router = express.Router();

router.get("/me", verifyToken, getMenu);
router.get("/:userId", verifyToken, getMenu);
router.post("/:userId", verifyToken, updateMenu);

export default router;