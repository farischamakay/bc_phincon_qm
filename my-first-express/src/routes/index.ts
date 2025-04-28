import express from "express";
import userRoutes from "./employee.route.js";
const router = express.Router();

router.use("/users", userRoutes);

export default router;
