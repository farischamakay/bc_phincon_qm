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
        try {
            const product = await db.Product.findByPk(req.params.id, {
                attributes: [
                    "id",
                    "name",
                    "price",
                    "category",
                    "stock",
                    "createdAt",
                    "updatedAt",
                ],
            });
            res.json({
                status: "success",
                message: "Product fetched successfully",
                product,
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
