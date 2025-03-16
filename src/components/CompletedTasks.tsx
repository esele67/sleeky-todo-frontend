import { useState, useEffect } from "react";
import { getTodos, updateTodoStatus } from "../services/todoService";

interface Todo {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  favorite: boolean;
}

interface CompletedTasksProps {
  refreshTrigger: number;
  onSuccess: (message: string) => void;
  isActive?: boolean;
}

const CompletedTasks = ({ refreshTrigger, onSuccess, isActive = false }: CompletedTasksProps) => {
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCompletedTodos = async () => {
      setIsLoading(true);
      try {
        const data = await getTodos();
        const completed = data.filter((todo: Todo) => todo.completed);
        setCompletedTodos(completed);
      } catch (error) {
        console.error("Failed to fetch completed todos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompletedTodos();
  }, [refreshTrigger]);

  const handleUncomplete = async (id: string) => {
    try {
      await updateTodoStatus(id, false);
      setCompletedTodos(prev => prev.filter(todo => todo._id !== id));
      onSuccess("Task marked as incomplete!");
    } catch (error) {
      console.error("Failed to update todo status:", error);
    }
  };

  if (isLoading) {
    return <div className={`loading ${isActive ? 'active' : ''}`}>Loading completed tasks...</div>;
  }

  return (
    <div className={`completed-tasks ${isActive ? 'active' : ''}`}>
      <h2>Completed Tasks</h2>
      
      {completedTodos.length === 0 ? (
        <div className="no-tasks">No completed tasks yet.</div>
      ) : (
        <ul>
          {completedTodos.map((todo) => (
            <li key={todo._id} className="completed-task-item">
              <div className="task-checkbox">
                <input
                  type="checkbox"
                  checked={true}
                  onChange={() => handleUncomplete(todo._id)}
                  id={`completed-${todo._id}`}
                />
                <label htmlFor={`completed-${todo._id}`} className="completed-label">
                  <span className="strike-through">{todo.title}</span>
                </label>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CompletedTasks;
