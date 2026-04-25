import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  brand: String,
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  stock: { type: Number, default: 0 },
  images: { type: [String], default: [] },
  rating: { type: Number, default: 0 },
}, { timestamps: true });

export const Product = mongoose.model("Product", productSchema);