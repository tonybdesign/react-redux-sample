import {
  GET_TODO_FORM,
  GET_TODO_FORM_SUCCESS,
  GET_TODO_FORM_FAILURE,
  UPDATE_TODO_FORM,
  UPDATE_TODO_FORM_SUCCESS,
  UPDATE_TODO_FORM_FAILURE,
  RESET_TODO_FORM,
} from '../actions/actionTypes';
import { readyState } from '../constants/states';

const initialState = {
  todo: {},
  readyState: readyState.ok,
};

const todoFormReducer = (state = initialState, { type, payload, error }) => {
  switch (type) {
    case GET_TODO_FORM:
      return { ...state, readyState: readyState.loading };
    case GET_TODO_FORM_SUCCESS:
      return { ...state, readyState: readyState.ok, todo: payload };
    case GET_TODO_FORM_FAILURE:
      return { ...state, readyState: readyState.error };
    case UPDATE_TODO_FORM:
      return ({ ...state, readyState: readyState.loading });
    case UPDATE_TODO_FORM_SUCCESS:
      return {
        ...state, readyState: readyState.ok, todo: { ...state.todo, ...payload }, error: undefined,
      };
    case UPDATE_TODO_FORM_FAILURE:
      return {
        ...state, error: error.errors, todo: payload, readyState: readyState.error,
      };
    case RESET_TODO_FORM:
      return { ...initialState };
    default:
      return state;
  }
};

export default todoFormReducer;
