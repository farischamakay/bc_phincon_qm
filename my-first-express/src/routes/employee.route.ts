import express, { Request, Response } from "express";
import UserController from "../controllers/employee.controllers.js";
const router = express.Router();

router.get("/", UserController.getAllEmployees);
router.get("/:id", UserController.getEmployeeById);
router.put("/:id", UserController.updateEmployee);
router.delete("/:id", UserController.deleteEmployee);

export default router;
