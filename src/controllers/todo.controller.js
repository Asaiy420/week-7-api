const todo = [];

let todoId = 0;

export const getTodos = (req, res) => {
  res.status(200).json({
    message: "Todos retrieved successfully",
    data: {
      todo,
    },
  });
};

export const addTodos = (req, res) => {
  const { title, description, dueDate, hasCompleted = false } = req.body;

  try {
    if (!title || !description || !dueDate) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields." });
    }
    todoId++;
    const newTodo = {
      todoId,
      title,
      description,
      hasCompleted,
      dueDate,
    };

    todo.push(newTodo);

    res.status(201).json({
      message: "Todo added successfully",
      data: {
        todo,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateTodo = (req, res) => {
  const { todoId } = req.params;
  const { title, description, hasCompleted, dueDate } = req.body;

  try {
    // Finds the todo id
    const index = todo.findIndex((t) => t.todoId === Number(todoId));

    if (index === -1) {
      return res.status(404).json({ message: "Todo not found" });
    }

    // Update the fields if provided, otherwise keep existing
    if (title !== undefined) todo[index].title = title;
    if (description !== undefined) todo[index].description = description;
    if (hasCompleted !== undefined) todo[index].hasCompleted = hasCompleted;
    if (dueDate !== undefined) todo[index].dueDate = dueDate;

    res.status(200).json({
      message: "Todo updated successfully",
      data: {
        todo,
      },
    });
  } catch (error) {
    console.error("Error when updating todos", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteTodo = (req, res) => {
  const { todoId } = req.params;

  try {
    if (!todoId) {
      return res.status(400).json({ message: "Please provide a todoId" });
    }

    const index = todo.findIndex((t) => t.todoId === Number(todoId));

    if (index === -1) {
      return res.status(404).json({ message: "Todo not found" });
    }

    todo.splice(index, 1);

    res.status(200).json({
      message: "Todo deleted successfully",
      data: {
        todo,
      },
    });
  } catch (error) {
    console.error("Error when deleting todos", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
