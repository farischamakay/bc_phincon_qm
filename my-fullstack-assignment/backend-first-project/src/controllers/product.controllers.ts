import { Request, Response } from "express";
import AbstractModel from "../abstracts/model.abstract.js";
import db from "../models/index.js";
import { v4 as uuidv4 } from "uuid";

class ProductController extends AbstractModel {
  async getAll(req: Request, res: Response): Promise<void> {
    console.log(db);
    try {
      const products = await db.Product.findAll();
      res.json({
        status: "success",
        message: "Products fetched successfully",
        products,
      });
    } catch (error: any) {
      res.json({
        status: "error",
        message: error.message,
      });
    }
  }
  async getById(req: Request, res: Response): Promise<void> {
    try {
      const product = await db.Product.findByPk(req.params.id, {
        attributes: ["id", "name"],
      });
      res.json({
        status: "success",
        message: "Product fetched successfully",
        product,
      });
    } catch (error: any) {
      res.json({
        status: "error",
        message: error.message,
      });
    }
  }
  async create(req: Request, res: Response): Promise<void> {
    try {
      const products = { ...req.body, id: uuidv4() };
      await db.Product.create(products);
      res.json({
        status: "success",
        message: "Product created successfully",
      });
    } catch (error: any) {
      res.json({
        status: "error",
        message: error.message,
      });
    }
  }
  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const product = await db.Product.update(
        { ...req.body },
        { where: { id } }
      );
      res.json({
        status: "success",
        message: "User Updated successfully",
        data: product,
      });
    } catch (error: any) {
      res.json({
        status: "error",
        message: error.message,
      });
    }
  }
  async delete(req: Request, res: Response): Promise<void> {
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
    } catch (error: any) {
      res.json({
        status: "error",
        message: error.message,
      });
    }
  }
}

export default new ProductController();
