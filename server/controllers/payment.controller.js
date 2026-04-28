import axios from "axios";
import Order from "../modules/order/order.model.js";

const CHAPA_API_URL = (process.env.CHAPA_API_URL || "https://api.chapa.co/v1").replace(/\/+$/, "");
const CHAPA_SECRET_KEY = process.env.CHAPA_SECRET_KEY || "";
const BACKEND_URL = (process.env.BACKEND_URL || "http://localhost:5000").replace(/\/+$/, "");
const FRONTEND_URL = (process.env.FRONTEND_URL || "http://localhost:5173").replace(/\/+$/, "");

// @desc    Initialize Chapa Payment
// @route   POST /api/payments/pay
export const pay = async (req, res) => {
  const { orderId } = req.body;

  if (!CHAPA_SECRET_KEY) {
    return res.status(500).json({ message: "CHAPA_SECRET_KEY is not configured on the server." });
  }

  try {
    const order = await Order.findById(orderId).populate("user", "firstName lastName email");
    if (!order) return res.status(404).json({ message: "Order not found" });

    const tx_ref = `tx-${orderId}-${Date.now()}`;

    // Cleaned up the chapaData object (removed duplicates and fixed syntax)
    const chapaData = {
      amount: order.totalPrice.toString(),
      currency: "ETB",
      email: order.user.email,
      first_name: order.user.firstName,
      last_name: order.user.lastName,
      tx_ref: tx_ref,
      callback_url: `${BACKEND_URL}/api/payments/callback/${tx_ref}`,
      return_url: `${FRONTEND_URL}/order-confirmation?tx_ref=${tx_ref}`,
      "customization[title]": "QuickBuy Order Payment",
      "customization[description]": `Payment for Order ${orderId}`,
    };

    const response = await axios.post(
      `${CHAPA_API_URL}/transaction/initialize`,
      chapaData,
      {
        headers: {
          Authorization: `Bearer ${CHAPA_SECRET_KEY}`,
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
    console.error("Chapa Pay Error:", error.response?.data || error.message);
    res.status(500).json({ message: error.response?.data?.message || error.message });
  }
};

// @desc    Verify Chapa Payment
// @route   GET /api/payments/verify/:tx_ref
export const verify = async (req, res) => {
  const { tx_ref } = req.params;

  if (!CHAPA_SECRET_KEY) {
    return res.status(500).json({ message: "CHAPA_SECRET_KEY is not configured on the server." });
  }

  try {
    const response = await axios.get(
      `${CHAPA_API_URL}/transaction/verify/${tx_ref}`,
      {
        headers: { Authorization: `Bearer ${CHAPA_SECRET_KEY}` },
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
      const receiptUrl =
        response?.data?.data?.receipt_url ||
        response?.data?.data?.receipt ||
        order?.paymentScreenshot ||
        null;

      return res.json({
        status: "success",
        message: "Payment verified",
        receipt: {
          tx_ref,
          orderId: order?._id || null,
          amount: order?.totalPrice || null,
          paymentStatus: order?.paymentStatus || "PAID",
          paidAt: order?.paidAt || new Date().toISOString(),
          receiptUrl,
        },
      });
    }
    res.status(400).json({ status: "failed", message: "Payment not verified" });
  } catch (error) {
    console.error("Chapa Verify Error:", error.response?.data || error.message);
    res.status(500).json({ message: "Verification error" });
  }
};

export const chapaCallback = async (req, res) => {
  res.status(200).send("Webhook received");
};