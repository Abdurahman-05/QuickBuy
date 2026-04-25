import { Product } from "./product.model.js";

import { Category } from "../category/category.model.js";
import { Review } from "../../models/review.model.js";

export const getProducts = async (req, res) => {
  try {
    const { search } = req.query;
    const filter = search ? { name: { $regex: search, $options: "i" } } : {};
    res.json(await Product.find(filter));
  } catch (err) { res.status(500).json({ error: err.message }); }
};

export const getProductById = async (req, res) => {
  try { res.json(await Product.findById(req.params.id)); } 
  catch (err) { res.status(500).json({ error: err.message }); }
};

export const addProduct = async (req, res) => {
  try { 
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product); 
  } catch (err) { 
    res.status(400).json({ error: err.message }); 
  }
};

export const updateProduct = async (req, res) => {
  try { res.json(await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })); } 
  catch (err) { res.status(400).json({ error: err.message }); }
};

export const deleteProduct = async (req, res) => {
  try { await Product.findByIdAndDelete(req.params.id); res.json({ message: "Deleted" }); } 
  catch (err) { res.status(500).json({ error: err.message }); }
};

export const getCategories = async (req, res) => {
  try { res.json(await Category.find()); } 
  catch (err) { res.status(500).json({ error: err.message }); }
};

export const addCategory = async (req, res) => {
  try { res.status(201).json(await new Category(req.body).save()); } 
  catch (err) { res.status(400).json({ error: err.message }); }
};

export const getReviews = async (req, res) => {
  try { res.json(await Review.find({ productId: req.params.id })); } 
  catch (err) { res.status(500).json({ error: err.message }); }
};

export const addReview = async (req, res) => {
  try { res.status(201).json(await new Review({ ...req.body, productId: req.params.id }).save()); } 
  catch (err) { res.status(400).json({ error: err.message }); }
};