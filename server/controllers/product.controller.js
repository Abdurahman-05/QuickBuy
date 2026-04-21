import { Product } from "../models/product.model.js";
import { Category } from "../models/category.model.js"; 
import { Review } from "../models/review.model.js";     

export const getProducts = async (req, res) => {
    const { search } = req.query;
    const filter = search ? { name: { $regex: search, $options: "i" } } : {};
    res.json(await Product.find(filter));
};

export const getProductById = async (req, res) => {
    res.json(await Product.findById(req.params.id));
};

export const getCategories = async (req, res) => {
    res.json(await Category.find());
};

export const getReviews = async (req, res) => {
    res.json(await Review.find({ productId: req.params.id }));
};

export const addReview = async (req, res) => {
    const newReview = new Review({ ...req.body, productId: req.params.id });
    await newReview.save();
    res.status(201).json(newReview);
};