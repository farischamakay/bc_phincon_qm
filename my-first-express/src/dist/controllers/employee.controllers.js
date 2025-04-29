"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let employees = [
    {
        id: 1,
        name: "Budi",
        email: "3zN4o@example.com",
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "bBx3U@example.com",
    },
    {
        id: 3,
        name: "Alice Johnson",
        email: "lMk6t@example.com",
    },
];
class EmployeeController {
    static getAllEmployees(req, res) {
        res.json({
            status: "success",
            message: "Welcome to the Employee API",
            data: employees,
        });
    }
    static getEmployeeById(req, res) {
        const { id } = req.params;
        const employee = employees.find((employee) => employee.id === Number(id));
        if (!employee) {
            res.json({
                status: "error",
                message: "Employee not found",
            });
            return;
        }
        res.json({
            status: "success",
            message: "Employee fetch successfully",
            data: employee,
        });
    }
    static updateEmployee(req, res) {
        const { id } = req.params;
        const { name, email } = req.body;
        const employeeIndex = employees.findIndex((employee) => employee.id === Number(id));
        if (employeeIndex === -1) {
            res.json({
                status: "error",
                message: "Employee not found",
            });
            return;
        }
        if (!name || !email) {
            res.json({
                status: "error",
                message: "Please fill in all the fields",
            });
            return;
        }
        employees[employeeIndex] = {
            id: Number(id),
            name,
            email,
        };
        res.json({
            status: "success",
            message: "Employee updated successfully",
            data: employees[employeeIndex],
        });
    }
    static deleteEmployee(req, res) {
        const { id } = req.params;
        const employeeIndex = employees.findIndex((employee) => employee.id === Number(id));
        if (employeeIndex === -1) {
            res.json({
                status: "error",
                message: "Employee not found",
            });
            return;
        }
        employees.splice(employeeIndex, 1);
        res.json({
            status: "success",
            message: "Employee deleted successfully",
        });
    }
}
exports.default = EmployeeController;
