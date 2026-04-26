import express from "express";
import { Category } from "../models/category.model.js";
const router = express.Router();

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/", async (req, res) => res.json(await Category.find()));

export default router;