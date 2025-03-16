import { useEffect, useState } from "react";
import { fetchTodos, deleteTodo, updateTodo } from "../services/todoService";

interface Todo {
  _id: string;
  title: string;
  completed: boolean;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[] | null>([]);

  useEffect(() => {
    fetchTodos().then(({ data }) => setTodos(data));
  }, []);

  const handleToggle = async (id: string, completed: boolean) => {
    await updateTodo(id, !completed);
    setTodos(todos && todos.map(todo => (todo._id === id ? { ...todo, completed: !completed } : todo)));
  };

  const handleDelete = async (id: string) => {
    await deleteTodo(id);
    setTodos(todos && todos.filter(todo => todo._id !== id));
  };

  return (
    <div>
      {todos && todos.map(todo => (
        <div key={todo._id} style={{ display: "flex", gap: "10px" }}>
          <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>{todo.title}</span>
          <button onClick={() => handleToggle(todo._id, todo.completed)}>Toggle</button>
          <button onClick={() => handleDelete(todo._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
