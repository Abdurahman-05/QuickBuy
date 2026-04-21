import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import { connectDB } from "./config/db.js";
import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/user/user.routes.js";
import { swaggerSpec } from "./config/swagger.js";
import { configureCloudinary } from "./config/cloudinary.js";

const app = express();
const port = Number(process.env.PORT) || 5000;

// Configs
connectDB();
configureCloudinary();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_ORIGIN ?? "http://localhost:5173" }));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger API Documentation Route
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCss: `
      .responses-inner h5:nth-of-type(2), .responses-inner .headers, .responses-inner .response-headers { display: none !important; }
      .download-contents, .copy-to-clipboard { top: 10px !important; bottom: auto !important; }
      .copy-to-clipboard { right: 100px !important; }
      .download-contents { right: 10px !important; }
      .microlight { padding-right: 140px !important; padding-top: 40px !important; }
    `,
  })
);

// Main Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "quickbuy-api" });
});

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
