import { SHOW_NOTIFICATION, DELETE_NOTIFICATION, HIDE_NOTIFICATION } from '../actions/actionTypes';

const initialState = {
  notifications: [],
}

const notificationsReducer = (state = initialState, {type, payload}) => {
  switch(type) {
    case SHOW_NOTIFICATION:
       return ({...state, notifications: [payload, ...state.notifications]});
    case HIDE_NOTIFICATION:
        return ({...state, notifications: [payload, ...state.notifications]});
    case DELETE_NOTIFICATION:
        return ({...state, notifications: [...state.notifications].filter(todo => todo.id !== payload.id)});
    default:
      return state
  }
}

export default notificationsReducer;