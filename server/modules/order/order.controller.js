import Order from "./order.model.js";

/**
 * @desc    Create new order
 * @route   POST /api/orders
 * @access  Private
 */
export const addOrderItems = async (req, res) => {
  try {
    const { orderItems, shippingAddress, totalPrice } = req.body;

    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get order by ID
 * @route   GET /api/orders/:id
 * @access  Private
 */
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "firstName lastName email"
    );

    if (order) {
      // Check if the user is admin or the owner of the order
      if (req.user.role !== "ADMIN" && order.user._id.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Not authorized to view this order" });
      }
      res.json(order);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Update order payment screenshot
 * @route   PATCH /api/orders/:id/payment
 * @access  Private
 */
export const uploadPaymentScreenshot = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      if (order.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Not authorized to update this order" });
      }

      if (!req.file) {
        return res.status(400).json({ message: "Please upload a screenshot" });
      }

      order.paymentScreenshot = req.file.path; // Cloudinary URL
      order.paymentStatus = "PENDING"; // Reset to pending for admin review if it was rejected
      
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get logged in user orders
 * @route   GET /api/orders/my-orders
 * @access  Private
 */
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort("-createdAt");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get all orders
 * @route   GET /api/orders
 * @access  Private/Admin
 */
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "id firstName lastName").sort("-createdAt");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Update order to paid (Verify Payment)
 * @route   PATCH /api/orders/:id/verify
 * @access  Private/Admin
 */
export const verifyPayment = async (req, res) => {
  try {
    const { status } = req.body; // "PAID" or "REJECTED"
    const order = await Order.findById(req.params.id);

    if (order) {
      order.paymentStatus = status || "PAID";
      if (order.paymentStatus === "PAID") {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.orderStatus = "PROCESSING";
      } else {
        order.isPaid = false;
        order.paidAt = null;
      }

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Update order status
 * @route   PATCH /api/orders/:id/status
 * @access  Private/Admin
 */
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body; // "SHIPPED", "DELIVERED", etc.
    const order = await Order.findById(req.params.id);

    if (order) {
      order.orderStatus = status;
      if (status === "DELIVERED") {
        order.isDelivered = true;
        order.deliveredAt = Date.now();
      }

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
