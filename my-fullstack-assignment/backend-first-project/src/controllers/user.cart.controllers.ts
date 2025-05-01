import { Request, Response } from "express";
import db from "../models/index.js";
import { v4 as uuidv4 } from "uuid";

class UserCartController {
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const userCarts = await db.UserCart.findAll();
      res.json({
        status: "success",
        message: "User carts fetched successfully",
        userCarts,
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
      const userCart = { ...req.body, id: uuidv4() };
      await db.UserCart.create(userCart);
      res.json({
        status: "success",
        message: "User cart created successfully",
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
      const userCart = await db.UserCart.destroy({
        where: { id: req.params.id },
      });
      res.json({
        status: "success",
        message: "User cart deleted successfully",
      });
    } catch (error: any) {
      res.json({
        status: "error",
        message: error.message,
      });
    }
  }
}

export default new UserCartController();
