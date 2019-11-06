import {
  GET_TODOLIST_LIST,
  GET_TODOLIST_LIST_SUCCESS,
  GET_TODOLIST_LIST_FAILURE,
  DELETE_TODO,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_FAILURE,
  UPDATE_TODO_LIST,
  UPDATE_TODO_LIST_SUCCESS,
  UPDATE_TODO_LIST_FAILURE,
} from './actionTypes';
import { getTodoListService, deleteTodoService, updateTodoService } from '../services/todoList';

const getTodoListSuccess = (payload) => ({
  type: GET_TODOLIST_LIST_SUCCESS,
  payload,
});

const getTodoListFailure = (error) => ({
  type: GET_TODOLIST_LIST_FAILURE,
  error,
});

export const getTodoList = () => async (dispatch) => {
  dispatch({ type: GET_TODOLIST_LIST });
  await getTodoListService()
    .then((res) => {
      if (res.ok) {
        res.json().then((data) => dispatch(getTodoListSuccess(data)));
      } else {
        res.json().then((data) => dispatch(getTodoListFailure(data)));
      }
    }).catch((e) => console.error(e));
};

const deleteTodoSuccess = (payload) => ({
  type: DELETE_TODO_SUCCESS,
  payload,
});

const deleteTodoFailure = (error, trainingData) => ({
  type: DELETE_TODO_FAILURE,
  error,
  payload: trainingData,
});

export const deleteTodo = (trainingID) => async (dispatch) => {
  dispatch({ type: DELETE_TODO });
  await deleteTodoService(trainingID)
    .then((res) => {
      if (res.ok) {
        res.json().then(() => dispatch(deleteTodoSuccess(trainingID)));
      } else {
        res.json().then((error) => dispatch(deleteTodoFailure(error, trainingID)));
      }
    }).catch((e) => console.error(e));
};

export const updateTodoListSuccess = (todoID, todoData) => ({
  type: UPDATE_TODO_LIST_SUCCESS,
  payload: { id: todoID, ...todoData },
});

export const updateTodoListFailure = (error) => ({
  type: UPDATE_TODO_LIST_FAILURE,
  error,
});

export const updateTodoList = (todoID, todoData) => async (dispatch) => {
  dispatch({ type: UPDATE_TODO_LIST });
  await updateTodoService(todoID, todoData)
    .then((res) => {
      if (res.ok) {
        dispatch(updateTodoListSuccess(todoID, todoData));
      } else {
        res.json().then((error) => dispatch(updateTodoListFailure(error)));
      }
    }).catch((e) => console.error(e));
};
