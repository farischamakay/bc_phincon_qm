import express, { Request, Response } from "express";
import routes from "./routes/employee.route.js";
const app = express();

// app.get("/", (req: Request, res: Response) => {
//   res.send("Hello World");
// });
app.use(express.json()); // Middleware to parse JSON request bodies
app.use("/api", routes);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
