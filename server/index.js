import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

import { connectDB } from "./config/db.js";
import { configureCloudinary } from "./config/cloudinary.js";
import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/user/user.routes.js";
import productRoutes from "./routes/product.routes.js";

const app = express();

// Configs
connectDB();
configureCloudinary();

// Middlewares
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_ORIGIN ?? "http://localhost:5173" }));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger Setup
const specs = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: { title: "QuickBuy API", version: "1.0.0" },
    components: {
      schemas: {
        Product: {
          type: "object",
          properties: {
            name: { type: "string" },
            price: { type: "number" },
            brand: { type: "string" },
            stock: { type: "number" }
          }
        },
        Review: {
          type: "object",
          properties: {
            productId: { type: "string" },
            rating: { type: "number" },
            comment: { type: "string" }
          }
        }
      }
    }
  },
  apis: ["./routes/*.js", "./modules/**/*.js"], // Scans all routes
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

// Health check
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

const port = Number(process.env.PORT) || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));