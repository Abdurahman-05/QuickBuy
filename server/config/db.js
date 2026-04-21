import mongoose from "mongoose";

export const connectDB = async () => {

  console.log("Attempting to connect to:", process.env.MONGO_URI); // ADD THIS LINE

  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in the .env file");
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

