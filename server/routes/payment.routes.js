import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { pay, verify, chapaCallback } from "../controllers/payment.controller.js";

const router = express.Router();

// The endpoint will be /api/payments/pay
router.post("/pay", protect, pay);

// The endpoint will be /api/payments/verify/:tx_ref
router.get("/verify/:tx_ref", verify);

// Webhook for Chapa (Optional but good for reliability)
router.post("/callback/:tx_ref", chapaCallback);

export default router;