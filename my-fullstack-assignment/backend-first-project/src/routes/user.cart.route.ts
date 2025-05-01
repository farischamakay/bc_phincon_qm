import express from "express";
import UserCartController from "../controllers/user.cart.controllers.js";
const router = express.Router();

router.get("/:userId", UserCartController.getAll);
router.post("/:userId", UserCartController.create);
router.delete("/:cartId", UserCartController.delete);

export default router;
