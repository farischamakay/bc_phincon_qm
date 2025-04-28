import express, { Request, Response } from "express";
const router = express.Router();

let employees = [
  {
    id: 1,
    name: "John Doe",
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

router.get("/", (req: Request, res: Response) => {
  res.json({
    status: "success",
    message: "Welcome to the Employee API",
    data: employees,
  });
});

router.get("/user/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const employee = employees.find((employee) => employee.id === Number(id));
  if (!employee) {
    res.json({
      status: "error",
      message: "User not found",
    });
    return;
  }
  res.json({
    status: "success",
    message: "user ferch successfully",
    data: employee,
  });
});

export default router;
