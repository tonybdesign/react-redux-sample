import {
  GET_TODO_FORM,
  GET_TODO_FORM_SUCCESS,
  GET_TODO_FORM_FAILURE,
  UPDATE_TODO_FORM,
  UPDATE_TODO_FORM_SUCCESS,
  UPDATE_TODO_FORM_FAILURE,
  RESET_TODO_FORM
} from './actionTypes';
import { getTodoService, updateTodoService, createTodoService } from '../services/todoList';

export const getTodo = todoID => {
 
  return async dispatch => {
    dispatch({type: GET_TODO_FORM})
    await getTodoService(todoID)
      .then(res => {
        if(res.ok) {
          res.json().then(data => dispatch(getTodoSuccess(data)))
        } else {
          res.json().then(data => dispatch(getTodoFailure(data)))
        }
      }).catch(e => console.log(e))
  }
};

const getTodoSuccess = payload => ({
  type: GET_TODO_FORM_SUCCESS,
  payload
});

const getTodoFailure = error => ({
  type: GET_TODO_FORM_FAILURE,
  error
});

export const resetTodoForm = () => ({
  type: RESET_TODO_FORM
});

export const addTodo = todoData => {
 
  return async dispatch => {
    dispatch({type: UPDATE_TODO_FORM})
    await createTodoService(todoData)
      .then(async res => {
        if(res.ok) {
          await res.json().then(() => dispatch(addTodoSuccess(todoData)))
          dispatch(resetTodoForm())
        } else {
          res.json().then(error => dispatch(addTodoFailure(error, todoData)))
        }
      }).catch(e => console.log(e))
  }
};

const addTodoSuccess = payload => ({
  type: UPDATE_TODO_FORM_SUCCESS,
  payload,
});

const addTodoFailure = (error, todoData) => ({
  type: UPDATE_TODO_FORM_FAILURE,
  error,
  payload: todoData
});


export const updateTodo = (todoID, todoData) => {
 
  return async dispatch => {
    dispatch({type: UPDATE_TODO_FORM})
    console.log(todoData)
    await updateTodoService(todoID, todoData)
      .then(res => {
        if(res.ok) {
          res.json().then(() => dispatch(updateTodoSuccess(todoData)))
        } else {
          res.json().then(error => dispatch(updateTodoFailure(error, todoData)))
        }
      }).catch(e => console.log(e))
  }
};

const updateTodoSuccess = payload => ({
  type: UPDATE_TODO_FORM_SUCCESS,
  payload,
});

const updateTodoFailure = (error, payload) => ({
  type: UPDATE_TODO_FORM_FAILURE,
  error,
  payload
});
