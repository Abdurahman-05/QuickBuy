import express from "express";
import { getProducts, getProductById, addProduct, updateProduct, deleteProduct, getCategories, addCategory, getReviews, addReview } from "../controllers/product.controller.js";

const router = express.Router();

/** @swagger
 * /api/products:
 *   get:
 *     tags: [Products]
 *     summary: Get all products
 *   post:
 *     tags: [Products]
 *     summary: Create product
 */
router.get("/", getProducts);
router.post("/", addProduct);

/** @swagger
 * /api/products/categories:
 *   get:
 *     tags: [Categories]
 *     summary: Get categories
 *   post:
 *     tags: [Categories]
 *     summary: Add category
 */
router.get("/categories", getCategories);
router.post("/categories", addCategory);

/** @swagger
 * /api/products/{id}:
 *   get:
 *     tags: [Products]
 *     summary: Get by ID
 *   put:
 *     tags: [Products]
 *     summary: Update product
 *   delete:
 *     tags: [Products]
 *     summary: Delete product
 */
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

/** @swagger
 * /api/products/{id}/reviews:
 *   get:
 *     tags: [Reviews]
 *     summary: Get reviews
 *   post:
 *     tags: [Reviews]
 *     summary: Add review
 */
router.get("/:id/reviews", getReviews);
router.post("/:id/reviews", addReview);

export default router;