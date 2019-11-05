import { apiUrl } from '../constants/config';
import { requester } from './utils';

export const getTodoListService = () => requester(`${apiUrl}/todolist`);

export const getTodoService = todoId => requester(`${apiUrl}/todolist/${todoId}`);

export const createTodoService = todoData => requester(`${apiUrl}/todolist`, {
  method: 'POST',
  body: JSON.stringify(todoData)
})

export const updateTodoService = (todoID, todoData) => requester(`${apiUrl}/todolist/${todoID}`, {
  method: 'PATCH',
  body: JSON.stringify(todoData)
})

export const deleteTodoService = todoID => requester(`${apiUrl}/todolist/${todoID}`, {
  method: 'DELETE'
})

