import AbstractModel from "../abstracts/model.abstract.js";
import db from "../models/index.js";
import { v4 as uuidv4 } from "uuid";
import { Op } from "sequelize";
class ProductController extends AbstractModel {
    async getAll(req, res) {
        console.log(db);
        try {
            const products = await db.Product.findAll({
                include: [
                    {
                        model: db.Category,
                        as: "category",
                        attributes: ["categoryId", "title"],
                    },
                ],
            });
            res.json({
                status: "success",
                message: "Products fetched successfully",
                products,
            });
        }
        catch (error) {
            res.json({
                status: "error",
                message: error.message,
            });
        }
    }
    async getById(req, res) {
        console.log("Raw productId from params:", req.params.productId);
        // Clean the ID (remove leading colon if present)
        const productId = req.params.productId.replace(/^:/, "");
        console.log("Cleaned productId:", productId);
        try {
            // 1. First verify the ID is a valid UUID
            if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(productId)) {
                res.status(400).json({
                    status: "error",
                    message: "Invalid product ID format",
                });
            }
            // 2. Query with the CLEANED ID
            const product = await db.Product.findByPk(productId, {
                attributes: [
                    "productId",
                    "name",
                    "price",
                    "categoryId",
                    "stock",
                    "data",
                    "createdAt",
                    "updatedAt",
                ],
                include: [
                    {
                        model: db.Category,
                        as: "category",
                        attributes: ["categoryId", "title"],
                    },
                ],
            });
            // 3. Handle null result
            if (!product) {
                res.status(404).json({
                    status: "error",
                    message: `Product with ID ${productId} not found`,
                });
            }
            res.json({
                status: "success",
                product,
            });
        }
        catch (error) {
            console.error("Error fetching product:", error);
            res.status(500).json({
                status: "error",
                message: "Internal server error",
            });
        }
    }
    async create(req, res) {
        try {
            const products = { ...req.body, id: uuidv4() };
            await db.Product.create(products);
            res.json({
                status: "success",
                message: "Product created successfully",
            });
        }
        catch (error) {
            res.json({
                status: "error",
                message: error.message,
            });
        }
    }
    async update(req, res) {
        try {
            const { id } = req.params;
            const product = await db.Product.update({ ...req.body }, { where: { id } });
            res.json({
                status: "success",
                message: "User Updated successfully",
                data: product,
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
            const { id } = req.params;
            await db.Product.destroy({
                where: {
                    id,
                },
            });
            res.json({
                status: "success",
                message: "User deleted successfully",
                data: id,
            });
        }
        catch (error) {
            res.json({
                status: "error",
                message: error.message,
            });
        }
    }
    async searchByName(req, res) {
        try {
            const { name } = req.query;
            if (!name || typeof name !== "string") {
                res.status(400).json({
                    status: "error",
                    message: "Query parameter 'name' is required and must be a string",
                });
                return;
            }
            const products = await db.Product.findAll({
                where: {
                    name: {
                        [Op.like]: `%${name}%`,
                    },
                },
            });
            res.json({
                status: "success",
                message: "Product fetched successfully",
                data: products,
            });
        }
        catch (error) {
            res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    }
}
export default new ProductController();
