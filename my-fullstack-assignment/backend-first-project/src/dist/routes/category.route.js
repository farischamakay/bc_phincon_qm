import express from "express";
import CategoryController from "../controllers/category.contollers.js";
const router = express.Router();
router.get("/", CategoryController.getAll);
export default router;
