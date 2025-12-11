import express from "express";
import { paymentSuccess } from "../controllers/payment.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

// POST /api/v1/payment/success - Requires authentication
router.post("/success", authMiddleware, paymentSuccess);
export default router;