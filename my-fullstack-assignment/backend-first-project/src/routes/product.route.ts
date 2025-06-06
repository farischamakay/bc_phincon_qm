import express from "express";
import ProductController from "../controllers/product.controllers.js";
const router = express.Router();

router.get("/", ProductController.getAll);
router.get("/:productId", ProductController.getById);
router.post("/", ProductController.create);
router.put("/:id", ProductController.update);
router.delete("/:id", ProductController.delete);
router.get("/search", ProductController.searchByName);

export default router;
