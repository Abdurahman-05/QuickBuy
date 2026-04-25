import { Product } from "../models/product.model.js";
import { Category } from "../models/category.model.js";
import { connectDB } from "../config/db.js";
import "dotenv/config";

const seedData = [
  { name: "Sony WH-1000XM5", price: 399, brand: "Sony", stock: 45, rating: 4.8, description: "Active Noise Cancelling" },
  { name: "MacBook Pro 16", price: 2499, brand: "Apple", stock: 12, rating: 4.9, description: "M3 Pro / 16GB / 512GB" },
  { name: "Instax Mini Evo", price: 199, brand: "Fujifilm", stock: 30, rating: 4.7, description: "Photography hybrid" }
];

const runSeed = async () => {
  await connectDB();
  await Product.deleteMany({});
  await Product.insertMany(seedData);
  console.log("Database seeded successfully!");
  process.exit();
};

runSeed();