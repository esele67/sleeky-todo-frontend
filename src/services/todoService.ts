import axios from "axios";

const API_URL = "http://localhost:5000/api/todos";

export const getTodos = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
};

export const addTodo = async (title: string, description: string = "") => {
  try {
    const response = await axios.post(API_URL, { title, description });
    return response.data;
  } catch (error) {
    console.error("Error adding todo:", error);
    throw error;
  }
};

export const updateTodoStatus = async (id: string, completed: boolean) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, { completed });
    return response.data;
  } catch (error) {
    console.error("Error updating todo status:", error);
    throw error;
  }
};

export const updateTodo = async (id: string, updatedTodo: any) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedTodo);
    return response.data;
  } catch (error) {
    console.error("Error updating todo:", error);
    throw error;
  }
};

export const toggleFavorite = async (id: string, favorite: boolean) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, { favorite });
    return response.data;
  } catch (error) {
    console.error("Error toggling favorite status:", error);
    throw error;
  }
};

export const deleteTodo = async (id: string) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
};
