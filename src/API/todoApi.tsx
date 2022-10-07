/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { TaskInfoAPI } from '@/store/interface';
import { axiosInstance } from './axios';

export const getTodoAPI = async () => {
  try {
    const response = await axiosInstance.get('/todos');
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const postTodoAPI = async (todo: TaskInfoAPI) => {
  try {
    await axiosInstance.post('/todos', todo);
  } catch (err) {
    console.log(err);
  }
};

export const putTodoAPI = async (id: number, todo: TaskInfoAPI) => {
  try {
    await axiosInstance.put(`/todos/${todo.id}`, todo);
  } catch (err) {
    console.log(err);
  }
};

export const deleteTodoAPI = async (todo: TaskInfoAPI) => {
  try {
    await axiosInstance.delete(`/todos/${todo.id}`);
  } catch (err) {
    console.log(err);
  }
};
