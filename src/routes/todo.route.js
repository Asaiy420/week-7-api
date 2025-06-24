import { Router } from "express";
import {
  getTodos,
  addTodos,
  updateTodo,
  deleteTodo,
} from "../controllers/todo.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", authMiddleware, getTodos);
router.post("/", authMiddleware, addTodos);
router.patch("/:todoId", authMiddleware, updateTodo);
router.delete("/:todoId", authMiddleware, deleteTodo);

export default router;
