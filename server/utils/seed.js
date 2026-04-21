import { Product } from "../models/product.model.js";

const seedData = [
  { name: "Wireless Headphones", price: 299, brand: "Sony", stock: 10, rating: 4.5 },
  { name: "Smart Watch", price: 199, brand: "Apple", stock: 5, rating: 4.8 }
];

export const seedDB = async () => {
  await Product.deleteMany({});
  await Product.insertMany(seedData);
  console.log("Database Seeded!");
};