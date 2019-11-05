import {
  GET_TODOLIST_LIST,
  GET_TODOLIST_LIST_SUCCESS,
  GET_TODOLIST_LIST_FAILURE,
  DELETE_TODO,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_FAILURE,
  UPDATE_TODO_LIST,
  UPDATE_TODO_LIST_SUCCESS,
  UPDATE_TODO_LIST_FAILURE
} from '../actions/actionTypes'
import { readyState } from '../constants/states'

const initialState = {
  todoList: [],
  readyState: readyState.ok,
}

const todoListListReducer = (state = initialState, { type, payload, error }) => {
  switch (type) {
    case GET_TODOLIST_LIST:
    case DELETE_TODO:
    case UPDATE_TODO_LIST:
      return {...state, readyState: readyState.loading}
    case GET_TODOLIST_LIST_SUCCESS:
      return {...state, readyState: readyState.ok, todoList: payload}
    case GET_TODOLIST_LIST_FAILURE:
      return {...state, readyState: readyState.error}
    case UPDATE_TODO_LIST_SUCCESS:
      const newTodoList = state.todoList.map(todo => todo.id === payload.id ? {...todo, ...payload} : todo)
      return {...state, readyState: readyState.ok, todoList: newTodoList}
    case UPDATE_TODO_LIST_FAILURE:
      return {...state, error: error.errors, readyState: readyState.error}
    case DELETE_TODO_SUCCESS:
      return {...state, readyState: readyState.ok, todoList: state.todoList.filter(todo => todo.id !== payload), error: undefined}
    case DELETE_TODO_FAILURE:
      return {...state, error: error.errors, todo: payload, readyState: readyState.error}
    default:
      return state
  }
}

export default todoListListReducer