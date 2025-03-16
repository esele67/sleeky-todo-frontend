import { useState, useEffect } from "react";
import { getTodos, updateTodoStatus, deleteTodo, updateTodo, toggleFavorite } from "../services/todoService";
import TaskInfoModal from "./TaskInfoModal";
import EditTaskModal from "./EditTaskModal";
import { Info, Pencil, StarIcon, Trash } from "lucide-react";

interface Todo {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  favorite: boolean;
}

interface TodoListProps {
  refreshTrigger: number;
  onSuccess: (message: string) => void;
}

const TodoList = ({ refreshTrigger, onSuccess }: TodoListProps) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [infoModal, setInfoModal] = useState<{ visible: boolean; todo: Todo | null }>({
    visible: false,
    todo: null,
  });
  const [editModal, setEditModal] = useState<{ visible: boolean; todo: Todo | null }>({
    visible: false,
    todo: null,
  });

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      try {
        const data = await getTodos();
        const incompleteTodos = data.filter((todo: Todo) => !todo.completed);
        setTodos(incompleteTodos);
      } catch (error) {
        console.error("Failed to fetch todos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, [refreshTrigger]);

  const handleStatusChange = async (id: string) => {
    try {
      await updateTodoStatus(id, true);
      setTodos(prev => prev.filter(todo => todo._id !== id));
      onSuccess("Task marked as completed!");
    } catch (error) {
      console.error("Failed to update todo status:", error);
    }
  };

  const handleFavoriteToggle = async (id: string, currentFavorite: boolean) => {
    try {
      await toggleFavorite(id, !currentFavorite);
      setTodos(prev => prev.map(todo => 
        todo._id === id ? {...todo, favorite: !currentFavorite} : todo
      ));
      onSuccess(currentFavorite ? "Task removed from favorites" : "Task added to favorites!");
    } catch (error) {
      console.error("Failed to update favorite status:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo._id !== id));
      onSuccess("Task deleted successfully!");
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  const handleEditSave = async (id: string, updatedTodo: Todo) => {
    try {
      await updateTodo(id, updatedTodo);
      setTodos(prev => prev.map(todo => todo._id === id ? updatedTodo : todo));
      setEditModal({ visible: false, todo: null });
      onSuccess("Task updated successfully!");
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  if (isLoading) {
    return <div className="loading">Loading tasks...</div>;
  }

  return (
    <div className="todo-list">
      <h2>My Tasks</h2>
      
      {todos.length === 0 ? (
        <div className="no-tasks">No tasks found. Add some tasks!</div>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo._id} className="task-item">
              <div className="task-checkbox">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleStatusChange(todo._id)}
                  id={`task-${todo._id}`}
                />
                <label htmlFor={`task-${todo._id}`}>{todo.title}</label>
              </div>
              
              <div className="task-actions">
                <button 
                  className="icon-button info" 
                  onClick={() => setInfoModal({ visible: true, todo })}
                  aria-label="Task Information"
                >
                  <Info />
                </button>
                
                <button 
                  className={`icon-button favorite ${todo.favorite ? 'active' : ''}`}
                  onClick={() => handleFavoriteToggle(todo._id, todo.favorite)}
                  aria-label="Favorite Task"
                >
                  <StarIcon
                    fill={todo.favorite ? "gold" : "none"}
                    stroke="gold"
                  />
                </button>
                
                <button 
                  className="icon-button edit"
                  onClick={() => setEditModal({ visible: true, todo })}
                  aria-label="Edit Task"
                >
                  <Pencil />
                </button>
                
                <button 
                  className="icon-button delete"
                  onClick={() => handleDelete(todo._id)}
                  aria-label="Delete Task"
                >
                  <Trash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {infoModal.visible && infoModal.todo && (
        <TaskInfoModal 
          todo={infoModal.todo} 
          onClose={() => setInfoModal({ visible: false, todo: null })}
        />
      )}

      {editModal.visible && editModal.todo && (
        <EditTaskModal 
          todo={editModal.todo} 
          onClose={() => setEditModal({ visible: false, todo: null })}
          onSave={handleEditSave}
        />
      )}
    </div>
  );
};

export default TodoList;
