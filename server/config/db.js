import mongoose from "mongoose";

export const connectDB = async () => {


  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in the .env file");
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    if (process.env.NODE_ENV === "production") {
      process.exit(1);
    }
    console.warn("Continuing without database connection in non-production mode.");
  }
};

