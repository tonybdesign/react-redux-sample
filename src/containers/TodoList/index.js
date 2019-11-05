import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { connect } from "react-redux";
import { compose } from "redux";

import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import Modal from '../../components/Modal';
import TableListHead from './TableListHead';
import TableListBody from './TableListBody';

import { getTodoList, deleteTodo, updateTodoList } from "../../actions/todoListActions";
import { showNotification } from "../../actions/notificationsActions";
import { selectorTodosList } from '../../selectors/todoList';

import messages from './messages';

const tHeadLabels = [
    messages.theadId,
    messages.theadName,
    messages.theadShortDescription,
    messages.theadFinished,
    messages.theadFavorite,
    messages.theadActions
];

const styles = theme => ({
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
        todoList: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            title: PropTypes.string,
            shortDescription: PropTypes.string,
            done: PropTypes.bool,
            favorite: PropTypes.bool,
        })),
        deleteTodo: PropTypes.func,
        updateTodoList: PropTypes.func,
        reqTodoList: PropTypes.func,
        showNotification: PropTypes.func,
    };

    state = {
        dialogOpened: false,
        todoToDeleteId: null,
    }

    componentDidMount() {
        this.props.reqTodoList();
    }

    onItemFieldChange = (todoId, fieldName) => e => {
        this.props.updateTodoList(todoId, { [fieldName]: e.target.checked });
    };

    handleCloseDeleteModal = () => this.setState({ dialogOpened: false, todoToDeleteId: null });

    deleteItem = todoId => {
        const { deleteTodo, showNotification, intl } = this.props

        deleteTodo(todoId);
        showNotification({
            variant: 'success',
            message: intl.formatMessage(messages.deleteNotificationSuccess, { id: todoId })
        });
    };

    openDeleteModal = todoId => () => this.setState({ todoToDeleteId: todoId, dialogOpened: true });

    hendeleDeleteConfirmation = () => {
        this.deleteItem(this.state.todoToDeleteId);
        this.handleCloseDeleteModal();
    }

    render() {
        const { todoList, classes, intl, match: { params: { filter } } } = this.props;
        const { dialogOpened, todoToDeleteId } = this.state;
        const filteredTodoList = filter === 'favorites' && todoList.filter(todo => todo.favorite) || todoList;

        return (
            <Paper className={classes.root}>
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

const mapStateToProps = state => ({
    todoList: selectorTodosList(state)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    deleteTodo: id => dispatch(deleteTodo(id)),
    updateTodoList: (todo, values) => dispatch(updateTodoList(todo, values)),
    reqTodoList: () => dispatch(getTodoList()),
    showNotification: notification => dispatch(showNotification(notification)),
});

export default compose(
    injectIntl,
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    withStyles(styles)
)(TodoList)