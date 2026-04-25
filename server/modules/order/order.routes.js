import express from "express";
import {
  addOrderItems,
  getOrderById,
  getMyOrders,
  getOrders,
  uploadPaymentScreenshot,
  verifyPayment,
  updateOrderStatus,
} from "./order.controller.js";
import { protect, adminCheck } from "../../middleware/authMiddleware.js";
import { upload } from "../../config/cloudinary.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     OrderItem:
 *       type: object
 *       required:
 *         - product
 *         - name
 *         - quantity
 *         - image
 *         - price
 *       properties:
 *         product:
 *           type: string
 *           description: The product ID
 *         name:
 *           type: string
 *         quantity:
 *           type: number
 *         image:
 *           type: string
 *         price:
 *           type: number
 *     Order:
 *       type: object
 *       required:
 *         - orderItems
 *         - shippingAddress
 *         - totalPrice
 *       properties:
 *         _id:
 *           type: string
 *         user:
 *           type: string
 *         orderItems:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderItem'
 *         shippingAddress:
 *           type: object
 *           properties:
 *             street: { type: string }
 *             city: { type: string }
 *             state: { type: string }
 *             country: { type: string }
 *             zipCode: { type: string }
 *         totalPrice:
 *           type: number
 *         paymentStatus:
 *           type: string
 *           enum: [PENDING, PAID, REJECTED]
 *         orderStatus:
 *           type: string
 *           enum: [PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED]
 *         paymentScreenshot:
 *           type: string
 *         isPaid:
 *           type: boolean
 *         paidAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: No order items
 */
router.route("/").post(protect, addOrderItems);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders (Admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all orders
 */
router.route("/").get(protect, adminCheck, getOrders);

/**
 * @swagger
 * /api/orders/my-orders:
 *   get:
 *     summary: Get logged in user orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user orders
 */
router.route("/my-orders").get(protect, getMyOrders);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order details
 *       404:
 *         description: Order not found
 */
router.route("/:id").get(protect, getOrderById);

/**
 * @swagger
 * /api/orders/{id}/payment:
 *   patch:
 *     summary: Upload payment screenshot
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Screenshot uploaded
 */
router.route("/:id/payment").patch(protect, upload.single("image"), uploadPaymentScreenshot);

/**
 * @swagger
 * /api/orders/{id}/verify:
 *   patch:
 *     summary: Verify order payment (Admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [PAID, REJECTED]
 *     responses:
 *       200:
 *         description: Payment status updated
 */
router.route("/:id/verify").patch(protect, adminCheck, verifyPayment);

/**
 * @swagger
 * /api/orders/{id}/status:
 *   patch:
 *     summary: Update order status (Admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [PROCESSING, SHIPPED, DELIVERED, CANCELLED]
 *     responses:
 *       200:
 *         description: Order status updated
 */
router.route("/:id/status").patch(protect, adminCheck, updateOrderStatus);

export default router;
