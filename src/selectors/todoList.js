import { createSelector } from 'reselect';

const selectTodoForm = (state) => state.todoForm;
const selectTodosList = (state) => state.todoList;

export const selectTodo = createSelector(
  selectTodoForm,
  (todoForm) => todoForm.todo,
);

export const selectTodoFormReadyState = createSelector(
  selectTodoForm,
  (todoForm) => todoForm.readyState,
);

export const selectTodoFormErrors = createSelector(
  selectTodoForm,
  (todoForm) => todoForm.error,
);

export const selectorTodosList = createSelector(
  selectTodosList,
  (todoList) => todoList.todoList,
);

export const selectTodosListReadyState = createSelector(
  selectTodosList,
  (todoList) => todoList.readyState,
);
