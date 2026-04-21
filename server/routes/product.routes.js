import express from "express";
import { getProducts, getProductById, getCategories, getReviews, addReview } from "../controllers/product.controller.js";

const router = express.Router();

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Retrieve a list of products
 *     responses: 
 *       200: { description: "Success" }
 */
router.get("/", getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 */
router.get("/:id", getProductById);

/**
 * @swagger
 * /api/products/categories:
 *   get:
 *     summary: Get all categories
 */
router.get("/categories", getCategories);

/**
 * @swagger
 * /api/products/{id}/reviews:
 *   get:
 *     summary: Get reviews for a product
 *   post:
 *     summary: Add a review
 */
router.get("/:id/reviews", getReviews);
router.post("/:id/reviews", addReview);

export default router;