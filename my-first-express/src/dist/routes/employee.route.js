"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const employee_controllers_js_1 = __importDefault(require("../controllers/employee.controllers.js"));
const router = express_1.default.Router();
router.get("/", employee_controllers_js_1.default.getAllEmployees);
router.get("/:id", employee_controllers_js_1.default.getEmployeeById);
router.put("/:id", employee_controllers_js_1.default.updateEmployee);
router.delete("/:id", employee_controllers_js_1.default.deleteEmployee);
exports.default = router;
