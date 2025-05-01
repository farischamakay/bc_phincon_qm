import { Request, Response } from "express";
import db from "../models/index.js";

class CategoryController {
  constructor() {}
  async getAll(req: Request, res: Response): Promise<void> {
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
    } catch (error: any) {
      res.json({
        status: "error",
        message: error.message,
      });
    }
  }
}
export default new CategoryController();
