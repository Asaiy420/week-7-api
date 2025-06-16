import { Router } from "express";
import {
  getTodos,
  addTodos,
  updateTodo,
  deleteTodo
} from "../controllers/todo.controller.js";

const router = Router();

router.get("/", getTodos);
router.post("/", addTodos);
router.put("/:todoId", updateTodo);
router.delete("/:todoId", deleteTodo);

export default router;
