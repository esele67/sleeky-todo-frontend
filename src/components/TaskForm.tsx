import { useState } from "react";
import { addTodo } from "../services/todoService";

interface TaskFormProps {
  onAddSuccess: (message: string) => void;
  onTaskAdded: () => void;
}

const TaskForm = ({ onAddSuccess, onTaskAdded }: TaskFormProps) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    setIsLoading(true);
    try {
      await addTodo(title, description);
      setTitle("");
      setDescription("");
      onAddSuccess("Task added successfully!");
      onTaskAdded();
    } catch (error) {
      console.error("Failed to add todo:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="task-form active">
        <h2>Add New Task</h2>
        <div className="form-group">
          <label htmlFor="taskTitle">Task Title:</label>
          <input
            id="taskTitle"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isLoading}
            placeholder="Enter task title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="taskDescription">Task Description:</label>
          <textarea
            id="taskDescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isLoading}
            placeholder="Enter task description"
            rows={4}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !title.trim()}
          className="submit-btn"
        >
          {isLoading ? "Adding..." : "Add Task"}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
