import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import Modal from '../../components/Modal';
import PageHeader from '../../components/PageHeader';
import TableListHead from './TableListHead';
import TableListBody from './TableListBody';

import { getTodoList, deleteTodo, updateTodoList } from '../../actions/todoListActions';
import { showNotification } from '../../actions/notificationsActions';
import { selectorTodosList } from '../../selectors/todoList';

import messages from './messages';

const tHeadLabels = [
  messages.theadId,
  messages.theadName,
  messages.theadShortDescription,
  messages.theadFinished,
  messages.theadFavorite,
  messages.theadActions,
];

const styles = () => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
});

class TodoList extends Component {
    static propTypes = {
      classes: PropTypes.shape({
        root: PropTypes.string,
        table: PropTypes.string,
      }),
      intl: PropTypes.shape({
        formatMessage: PropTypes.func,
      }),
      todoList: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        shortDescription: PropTypes.string,
        done: PropTypes.bool,
        favorite: PropTypes.bool,
      })),
      match: PropTypes.shape({
        params: PropTypes.shape({
          filter: PropTypes.string,
        }),
      }),
      reqDeleteTodo: PropTypes.func,
      reqUpdateTodoList: PropTypes.func,
      reqTodoList: PropTypes.func,
      reqShowNotification: PropTypes.func,
    };

    state = {
      dialogOpened: false,
      todoToDeleteId: null,
    }

    componentDidMount() {
      this.props.reqTodoList();
    }

    onItemFieldChange = (todoId, fieldName) => (e) => {
      this.props.reqUpdateTodoList(todoId, { [fieldName]: e.target.checked });
    };

    handleCloseDeleteModal = () => this.setState({ dialogOpened: false, todoToDeleteId: null });

    deleteItem = (todoId) => {
      const { reqDeleteTodo, reqShowNotification, intl } = this.props;

      reqDeleteTodo(todoId);
      reqShowNotification({
        variant: 'success',
        message: intl.formatMessage(messages.deleteNotificationSuccess, { id: todoId }),
      });
    };

    openDeleteModal = (todoId) => () => this.setState({ todoToDeleteId: todoId, dialogOpened: true });

    hendeleDeleteConfirmation = () => {
      this.deleteItem(this.state.todoToDeleteId);
      this.handleCloseDeleteModal();
    }

    render() {
      const {
        todoList, classes, intl, match: { params: { filter } },
      } = this.props;
      const { dialogOpened, todoToDeleteId } = this.state;
      const isFavoriteList = filter === 'favorites';
      const filteredTodoList = isFavoriteList && todoList.filter((todo) => todo.favorite) || todoList;

      return (
        <Paper className={classes.root}>
          <PageHeader>
            {intl.formatMessage(messages[isFavoriteList ? 'pageTitleListFav' : 'pageTitleList'])}
          </PageHeader>
          <Table className={classes.table} aria-label="simple table">
            <TableListHead tableTranslationLabels={tHeadLabels} />
            <TableListBody
              items={filteredTodoList}
              onDeleteItem={this.openDeleteModal}
              onItemFieldChange={this.onItemFieldChange}
            />
          </Table>
          <Modal
            open={dialogOpened}
            onConfirm={this.hendeleDeleteConfirmation}
            onClose={this.handleCloseDeleteModal}
            title={intl.formatMessage(messages.deleteModalTitle, { id: todoToDeleteId })}
            content={intl.formatMessage(messages.deleteModalContent)}
          />
        </Paper>
      );
    }
}

const mapStateToProps = (state) => ({
  todoList: selectorTodosList(state),
});

const mapDispatchToProps = (dispatch) => ({
  reqDeleteTodo: (id) => dispatch(deleteTodo(id)),
  reqUpdateTodoList: (todo, values) => dispatch(updateTodoList(todo, values)),
  reqTodoList: () => dispatch(getTodoList()),
  reqShowNotification: (notification) => dispatch(showNotification(notification)),
});

export default compose(
  injectIntl,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withStyles(styles),
)(TodoList);
