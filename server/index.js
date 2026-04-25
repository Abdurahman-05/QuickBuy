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
import orderRoutes from "./modules/order/order.routes.js";
import cartRoutes from "./modules/cart/cart.routes.js";

const app = express();

// Configs
connectDB();
configureCloudinary();

// Middlewares
app.use(helmet());
<<<<<<< HEAD
const configuredOrigins = process.env.CLIENT_ORIGIN?.split(",").map((origin) => origin.trim()).filter(Boolean) ?? [];
app.use(cors({
  origin: (origin, callback) => {
    const isLocalhostDevOrigin = /^http:\/\/localhost:\d+$/.test(origin ?? "");
    if (!origin || configuredOrigins.includes(origin) || isLocalhostDevOrigin) {
      return callback(null, true);
    }
    return callback(new Error(`CORS blocked for origin: ${origin}`));
  }
=======
// Updated CORS to be more permissive for Swagger and frontend team testing
app.use(cors({
  origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true
>>>>>>> main
}));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger Setup
const specs = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: { title: "QuickBuy API", version: "1.0.0" },
    servers: [
      { url: "http://localhost:5000", description: "Development server" }
    ],
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            _id: { type: "string" },
            firstName: { type: "string" },
            lastName: { type: "string" },
            email: { type: "string" },
            phone: { type: "string", nullable: true },
            profileImage: { type: "string", nullable: true },
            role: { type: "string", enum: ["USER", "ADMIN"] },
            address: {
              type: "object",
              properties: {
                street: { type: "string", nullable: true },
                city: { type: "string", nullable: true },
                state: { type: "string", nullable: true },
                country: { type: "string", nullable: true },
                zipCode: { type: "string", nullable: true }
              }
            },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" }
          }
        },
        AuthResponse: {
          type: "object",
          properties: {
            _id: { type: "string" },
            firstName: { type: "string" },
            lastName: { type: "string" },
            email: { type: "string" },
            phone: { type: "string", nullable: true },
            profileImage: { type: "string", nullable: true },
            role: { type: "string" },
            address: { type: "object" },
            token: { type: "string" },
            message: { type: "string" }
          }
        },
        Error: {
          type: "object",
          properties: {
            message: { type: "string" },
            error: { type: "string" },
            stack: { type: "string" }
          }
        },
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
      },
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: ["./routes/*.js", "./modules/**/*.js"], 
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);

// Health check
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

const port = Number(process.env.PORT) || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));