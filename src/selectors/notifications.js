import { createSelector } from 'reselect';

const notificationsSelector = (state) => state.notifications;

export const selectNotifications = createSelector(
  notificationsSelector,
  (selectedNotifications) => selectedNotifications.notifications,
);
