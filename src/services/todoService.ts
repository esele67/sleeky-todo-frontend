import axios from "axios";

const API_URL = "https://sleeky-todos.vercel.app/api/todos";

export const fetchTodos = async () => axios.get(API_URL);
export const addTodo = async (title: string) => axios.post(API_URL, { title });
export const updateTodo = async (id: string, completed: boolean) => axios.put(`${API_URL}/${id}`, { completed });
export const deleteTodo = async (id: string) => axios.delete(`${API_URL}/${id}`);
