import { Product } from "../models/product.model.js";
import { Category } from "../models/category.model.js";
import { Review } from "../models/review.model.js";

const mapProduct = (productDoc) => {
  const product = productDoc?.toObject?.() ?? productDoc;
  const categoryName = typeof product?.categoryId === "object" && product?.categoryId !== null
    ? product.categoryId.name
    : undefined;

  return {
    ...product,
    category: product?.category ?? categoryName ?? "GENERAL",
  };
};

export const getProducts = async (req, res) => {
  try {
    const { search, category } = req.query;
    const filter = {};
    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    const query = Product.find(filter).populate("categoryId", "name").sort({ createdAt: -1 });
    const products = await query;
    const categoryQuery = String(category || "").trim().toLowerCase();
    const filteredProducts = categoryQuery
      ? products.filter((product) => mapProduct(product).category.toLowerCase() === categoryQuery)
      : products;

    res.json(filteredProducts.map(mapProduct));
  } catch (err) { res.status(500).json({ error: err.message }); }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("categoryId", "name");
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    return res.json(mapProduct(product));
  } 
  catch (err) { res.status(500).json({ error: err.message }); }
};

export const addProduct = async (req, res) => {
  try {
    const payload = {
      ...req.body,
      images: Array.isArray(req.body.images)
        ? req.body.images
        : req.body.image
          ? [req.body.image]
          : [],
    };
    const createdProduct = await new Product(payload).save();
    const hydrated = await Product.findById(createdProduct._id).populate("categoryId", "name");
    res.status(201).json(mapProduct(hydrated));
  } 
  catch (err) { res.status(400).json({ error: err.message }); }
};

export const updateProduct = async (req, res) => {
  try {
    const payload = {
      ...req.body,
      ...(req.body.image ? { images: [req.body.image] } : {}),
    };
    const updated = await Product.findByIdAndUpdate(req.params.id, payload, { new: true })
      .populate("categoryId", "name");
    if (!updated) {
      return res.status(404).json({ error: "Product not found" });
    }
    return res.json(mapProduct(updated));
  } 
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