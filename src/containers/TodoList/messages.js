import { defineMessages } from 'react-intl';

export default defineMessages({
  pageTitleList: {
    id: 'app.todoList.pageTitleList',
    defaultMessage: 'My todo list',
  },
  pageTitleListFav: {
    id: 'app.todoList.pageTitleListFav',
    defaultMessage: 'My favorites todos',
  },
  deleteNotificationSuccess: {
    id: 'app.todoList.deleteNotificationSuccess',
    defaultMessage: 'Todo id: {id} successfully deleted',
  },
  deleteModalTitle: {
    id: 'app.todoList.deleteModalTitle',
    defaultMessage: 'Delete item with id: {id}?',
  },
  deleteModalContent: {
    id: 'app.todoList.deleteModalContent',
    defaultMessage: 'Are you sure you want to delete this todo?',
  },
  theadId: {
    id: 'app.todoList.theadId',
    defaultMessage: 'ID',
  },
  theadName: {
    id: 'app.todoList.theadName',
    defaultMessage: 'Name',
  },
  theadShortDescription: {
    id: 'app.todoList.theadShortDescription',
    defaultMessage: 'Short Description',
  },
  theadFinished: {
    id: 'app.todoList.theadFinished',
    defaultMessage: 'Finished',
  },
  theadFavorite: {
    id: 'app.todoList.theadFavorite',
    defaultMessage: 'Favorite',
  },
  theadActions: {
    id: 'app.todoList.theadActions',
    defaultMessage: 'Actions',
  },
});
