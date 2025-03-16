import { useState } from "react";
import { addTodo } from "./services/todoService";
import TodoList from "./components/TodoList";

const App = () => {
  const [title, setTitle] = useState<string>("");

  const handleAdd = async () => {
    await addTodo(title);
    setTitle("");
  };

  return (
    <div>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={handleAdd}>Add</button>
      <TodoList />
    </div>
  );
};

export default App;
