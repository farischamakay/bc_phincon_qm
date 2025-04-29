"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const employee_route_js_1 = __importDefault(require("./routes/employee.route.js"));
const app = (0, express_1.default)();
app.use(express_1.default.json()); // Middleware to parse JSON request bodies
app.use("/", employee_route_js_1.default);
const port = 3000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
