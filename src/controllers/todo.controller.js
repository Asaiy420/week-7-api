import Todo from "../models/todo.model.js";

export const getTodos = async (req, res) => {
  try {
    const response = await Todo.find({ userId: req.user.userId });

    if (!response) {
      return res.status(404).json({ message: "No todos found" });
    }

    return res.status(200).json({
      message: "Todos retrieved successfully",
      data: {
        todo: response,
      },
    });
  } catch (error) {
    console.error("Error when retrieving todos", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const addTodos = async (req, res) => {
  const { title, description, dueDate, userId } = req.body;

  try {
    if (!title || !description || !dueDate || !userId) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields." });
    }

    // Parse dueDate to a Date object
    const parsedDueDate = new Date(dueDate);
    if (isNaN(parsedDueDate.getTime())) {
      return res.status(400).json({
        message:
          "Invalid dueDate format. Please use a valid date string (e.g., 2025-08-24 or 2025/08/24).",
      });
    }

    // Generates a unique todoId
    const lastTodo = await Todo.findOne({}, {}, { sort: { todoId: -1 } });
    const nextTodoId = lastTodo ? lastTodo.todoId + 1 : 1;

    const newTodo = await Todo.create({
      todoId: nextTodoId,
      title,
      description,
      dueDate: parsedDueDate,
      userId,
    });

    return res.status(201).json({
      message: "Todo created successfully",
      data: {
        todo: newTodo,
      },
    });
  } catch (error) {
    console.error("Error when creating a todo", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateTodo = async (req, res) => {
  const { todoId } = req.params;
  const { title, description, dueDate } = req.body;

  try {
    // Check if the todo exists
    const todo = await Todo.findById(todoId);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    // Update the todo
    todo.title = title !== undefined ? title : todo.title;
    todo.description =
      description !== undefined ? description : todo.description;
    todo.dueDate = dueDate !== undefined ? dueDate : todo.dueDate;
    await todo.save();

    return res.status(200).json({
      message: "Todo updated successfully",
      data: { todo },
    });
  } catch (error) {
    console.error("Error when updating todos", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteTodo = async (req, res) => {
  const { todoId } = req.params;

  try {
    if (!todoId) {
      return res.status(400).json({ message: "Please provide a todoId" });
    }

    const todo = await Todo.findById(todoId);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    await Todo.findByIdAndDelete(todoId);
    return res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Error when deleting todos", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
