"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const employee_route_js_1 = __importDefault(require("./employee.route.js"));
const router = express_1.default.Router();
router.use("/users", employee_route_js_1.default);
exports.default = router;
