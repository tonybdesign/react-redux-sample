import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import localizationReducer from './localization';
import todoListReducer from './todoList';
import todoFormReducer from './todoForm';
import notificationsReducer from './notifications';

const appReducer = combineReducers({
  routing: routerReducer,
  localization: localizationReducer,
  todoList: todoListReducer,
  todoForm: todoFormReducer,
  notifications: notificationsReducer,
});


export default appReducer;
