import express from "express";
import { PORT } from "./config.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

// Initializations
const app = express();

// settings
app.set("port", PORT);
app.use(express.json());

// routes
app.use(authRoutes);
app.use(userRoutes);

export default app;