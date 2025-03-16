import { useState } from "react";
import { motion } from "framer-motion";
import TodoList from "./components/TodoList";
import TaskForm from "./components/TaskForm";
import CompletedTasks from "./components/CompletedTasks";
import Toast from "./components/Toast";
import "./index.css";

const App = () => {
  const [activeTab, setActiveTab] = useState<string>("tasks");
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({
    message: "",
    visible: false,
  });

  const handleSuccess = (message: string) => {
    setRefreshTrigger(prev => prev + 1);
    setToast({ message, visible: true });
    setTimeout(() => {
      setToast({ message: "", visible: false });
    }, 3000);
  };

  return (
    <div className="todo-container">
      
      <motion.div 
        className="todo-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="animated-title"
        >
          Sleeky Programmers To-do List
        </motion.h1>
      </motion.div>
      
      
      <div className="todo-tabs">
        {["tasks", "form", "completed"].map(tab => (
          <div 
            key={tab}
            className={`todo-tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "tasks" ? "Tasks" : tab === "form" ? "Task Form" : "Completed"}
          </div>
        ))}
      </div>

      
      <div className="todo-content">
        {activeTab === "tasks" && (
          <TodoList refreshTrigger={refreshTrigger} onSuccess={handleSuccess} />
        )}
        {activeTab === "form" && (
          <TaskForm
            onAddSuccess={(msg: any) => handleSuccess(msg)}
            onTaskAdded={() => setRefreshTrigger(prev => prev + 1)}
          />
        )}
        {activeTab === "completed" && (
          <CompletedTasks
            refreshTrigger={refreshTrigger}
            onSuccess={(message: string) => setToast({ message, visible: true })}
            isActive={activeTab === 'completed'} 
          />
        )}
      </div>

      
      {toast.visible &&
        <Toast
          message={toast.message}
          onClose={() => setToast({ message: '', visible: false })}
        />
      }
    </div>
  );
};

export default App;
