interface Todo {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  favorite: boolean;
}

interface TaskInfoModalProps {
  todo: Todo;
  onClose: () => void;
}

const TaskInfoModal = ({ todo, onClose }: TaskInfoModalProps) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Task Details</h3>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <h4>{todo.title}</h4>
          <div className="task-description">
            {todo.description || "No description provided."}
          </div>
          <div className="task-status">
            Status: 
            <span className={todo.completed ? "completed" : "pending"}>
              {todo.completed ? " Completed" : " Pending"}
            </span>
          </div>
          <div className="task-status">
            Favorite: 
            <span>
              {todo.favorite ? " Yes" : " No"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskInfoModal;
