import { Router } from "express";
import {
  forgotPassword,
  login,
  logout,
  resetPassword,
} from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/login", login);
router.post("/logout", authMiddleware, logout);
router.post("/forgot-password", authMiddleware, forgotPassword);
router.post("/reset-password", authMiddleware, resetPassword);

export default router;
