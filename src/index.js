import express from "express";
import todoRoutes from "./routes/todo.route.js";
import authRoutes from "./routes/auth.route.js"; 
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./utils/db.js";

dotenv.config();

const app = express();
const PORT =  3000;

app.use(cors());
app.use(express.json());

app.use("/api/todo", todoRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
