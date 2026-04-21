import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.routes.js";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

const specs = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: { title: "QuickBuy API", version: "1.0.0" },
  },
  apis: ["./routes/*.js"],
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/api/products", productRoutes);
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));