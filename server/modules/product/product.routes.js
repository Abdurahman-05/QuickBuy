import express from "express";
import {
  getProducts, getProductById, addProduct, updateProduct, deleteProduct,
  getCategories, addCategory, getReviews, addReview
} from "./product.controller.js";

const router = express.Router();

/**
 * @swagger
 * /api/products/categories:
 *   get:
 *     tags: [Categories]
 *     summary: Get all categories
 *     responses:
 *       200:
 *         description: Success
 *   post:
 *     tags: [Categories]
 *     summary: Add new category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 */
router.get("/categories", getCategories);
router.post("/categories", addCategory);

/**
 * @swagger
 * /api/products:
 *   get:
 *     tags: [Products]
 *     summary: Get all products
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *   post:
 *     tags: [Products]
 *     summary: Create new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Created
 */
router.get("/", getProducts);
router.post("/", addProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     tags: [Products]
 *     summary: Get product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *   put:
 *     tags: [Products]
 *     summary: Update product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Success
 *   delete:
 *     tags: [Products]
 *     summary: Delete product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

/**
 * @swagger
 * /api/products/{id}/reviews:
 *   get:
 *     tags: [Reviews]
 *     summary: Get reviews for product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *   post:
 *     tags: [Reviews]
 *     summary: Add review to product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       201:
 *         description: Created
 */
router.get("/:id/reviews", getReviews);
router.post("/:id/reviews", addReview);


/** @swagger
 * /api/products/dashboard/stats:
 *   get:
 *     tags: [Products]
 *     summary: Get admin dashboard stats
 */
router.get("/dashboard/stats", async (req, res) => {
  try {
    const productCount = await Product.countDocuments(); // Counts real products
    res.json({
      totalProducts: productCount,
      totalOrders: 1240, // Mock for now
      totalUsers: 842,   // Mock for now
      revenue: 45200,    // Mock for now
      recentOrders: [
        { id: "#QB-9021", customer: "Alexander Pierce", total: 1299, status: "Completed", date: "Oct 24" },
        { id: "#QB-9022", customer: "Sophia Martinez", total: 349, status: "Completed", date: "Oct 24" }
      ]
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
export default router;