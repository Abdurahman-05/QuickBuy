import axios from "axios";
import Order from "../modules/order/order.model.js";

// @desc    Initialize Chapa Payment
// @route   POST /api/payments/pay
export const pay = async (req, res) => {
  const { orderId } = req.body;

  try {
    const order = await Order.findById(orderId).populate("user", "firstName lastName email");
    if (!order) return res.status(404).json({ message: "Order not found" });

    const tx_ref = `tx-${orderId}-${Date.now()}`;

    const chapaData = {
      amount: order.totalPrice.toString(),
      currency: "ETB",
      email: order.user.email,
      first_name: order.user.firstName,
      last_name: order.user.lastName,
      tx_ref: tx_ref,
      callback_url: `${process.env.BACKEND_URL}/api/payments/callback/${tx_ref}`,
      return_url: `${process.env.FRONTEND_URL}/order-confirmation?tx_ref=${tx_ref}`,
      "customization[title]": "QuickBuy Order Payment",
      "customization[description]": `Payment for Order ${orderId}`,
    };

    const response = await axios.post(
      `${process.env.CHAPA_API_URL}/transaction/initialize`,
      chapaData,
      {
        headers: {
          Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.status === "success") {
      order.tx_ref = tx_ref;
      await order.save();
      return res.json({ checkout_url: response.data.data.checkout_url });
    } else {
      return res.status(400).json({ message: "Payment initialization failed" });
    }
  } catch (error) {
    res.status(500).json({ message: error.response?.data?.message || error.message });
  }
};

// @desc    Verify Chapa Payment
// @route   GET /api/payments/verify/:tx_ref
export const verify = async (req, res) => {
  const { tx_ref } = req.params;

  try {
    const response = await axios.get(
      `${process.env.CHAPA_API_URL}/transaction/verify/${tx_ref}`,
      {
        headers: { Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}` },
      }
    );

    if (response.data.status === "success") {
      const order = await Order.findOne({ tx_ref });
      if (order && !order.isPaid) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentStatus = "PAID";
        order.orderStatus = "PROCESSING";
        await order.save();
      }
      return res.json({ status: "success", message: "Payment verified" });
    }
    res.status(400).json({ status: "failed", message: "Payment not verified" });
  } catch (error) {
    res.status(500).json({ message: "Verification error" });
  }
};

export const chapaCallback = async (req, res) => {
  res.status(200).send("Webhook received");
};