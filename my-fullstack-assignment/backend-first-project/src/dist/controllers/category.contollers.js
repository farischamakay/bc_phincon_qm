import db from "../models/index.js";
class CategoryController {
    constructor() { }
    async getAll(req, res) {
        try {
            const categories = await db.Category.findAll({
                attributes: ["categoryId", "title"],
                include: [
                    {
                        model: db.Product,
                        attributes: ["productId", "name", "price"],
                    },
                ],
            });
            res.json({
                status: "success",
                message: "Categories fetched successfully",
                categories,
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
export default new CategoryController();
