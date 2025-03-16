import React, { useState } from "react";

interface Todo {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  favorite: boolean;
}

interface EditTaskModalProps {
  todo: Todo;
  onClose: () => void;
  onSave: (id: string, updatedTodo: Todo) => void;
}

const EditTaskModal = ({ todo, onClose, onSave }: EditTaskModalProps) => {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    const updatedTodo = {
      ...todo,
      title,
      description
    };
    
    onSave(todo._id, updatedTodo);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Edit Task</h3>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="edit-title">Task Title:</label>
              <input
                id="edit-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter task title"
              />
            </div>
            <div className="form-group">
              <label htmlFor="edit-description">Task Description:</label>
              <textarea
                id="edit-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter task description"
                rows={4}
              />
            </div>
            <div className="modal-actions">
              <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
              <button type="submit" className="save-btn" disabled={!title.trim()}>Update Task</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
