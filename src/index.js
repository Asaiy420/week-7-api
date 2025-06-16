import express from "express";
import todoRoutes from "./routes/todo.route.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/todo", todoRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
