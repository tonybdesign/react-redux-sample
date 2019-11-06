import { SHOW_NOTIFICATION, DELETE_NOTIFICATION } from './actionTypes';
import { generateId } from '../utils/generatos';

export const deleteNotification = (notificationId) => ({
  type: DELETE_NOTIFICATION,
  payload: { id: notificationId },
});

export const showNotification = (notification) => (dispatch) => {
  const notficationId = generateId();
  dispatch({
    type: SHOW_NOTIFICATION,
    payload: { ...notification, open: true, id: notficationId },
  });
  setTimeout(() => dispatch(deleteNotification(notficationId)), 3000);
};
