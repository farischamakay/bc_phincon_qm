import db from "../models/index.js";
import { v4 as uuidv4 } from "uuid";
class UserCartController {
    async getAll(req, res) {
        try {
            const userCarts = await db.UserCart.findAll();
            res.json({
                status: "success",
                message: "User carts fetched successfully",
                userCarts,
            });
        }
        catch (error) {
            res.json({
                status: "error",
                message: error.message,
            });
        }
    }
    async create(req, res) {
        try {
            const userCart = { ...req.body, id: uuidv4() };
            await db.UserCart.create(userCart);
            res.json({
                status: "success",
                message: "User cart created successfully",
            });
        }
        catch (error) {
            res.json({
                status: "error",
                message: error.message,
            });
        }
    }
    async delete(req, res) {
        try {
            const userCart = await db.UserCart.destroy({
                where: { id: req.params.id },
            });
            res.json({
                status: "success",
                message: "User cart deleted successfully",
            });
        }
        catch (error) {
            res.json({
                status: "error",
                message: error.message,
            });
        }
    }
}
export default new UserCartController();
