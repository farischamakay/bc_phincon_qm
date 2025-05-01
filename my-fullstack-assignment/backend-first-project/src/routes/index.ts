import express from "express";
import productRouter from "./product.route.js";
import categoryRouter from "./category.route.js";
import userCartRouter from "./user.cart.route.js";
const router = express.Router();

router.use("/products", productRouter);
router.use("/categories", categoryRouter);
router.use("/user/cart", userCartRouter);

export default router;
