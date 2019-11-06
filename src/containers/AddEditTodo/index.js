import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Field, withFormik } from 'formik';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  Button,
  LinearProgress,
  Paper,
} from '@material-ui/core';
import { TextField } from 'material-ui-formik-components/TextField';
import { withStyles, styled } from '@material-ui/core/styles';

import PageHeader from '../../components/PageHeader';

import { showNotification } from '../../actions/notificationsActions';
import { getTodo, addTodo, updateTodo } from '../../actions/todoFormActions';
import { selectTodo } from '../../selectors/todoList';

import validate from './validate';
import messages from './messages';

const styles = () => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  form: {
    padding: 20,
    paddingTop: 0,
  },
});

const StyledTextField = styled(TextField)({
  marginBottom: 10,
});

const StyledButton = styled(Button)({
  marginTop: 10,
});

class AddEditTodo extends Component {
  static propTypes = {
    classes: PropTypes.shape({
      root: PropTypes.string,
      form: PropTypes.string,
    }),
    errors: PropTypes.shape({
      title: PropTypes.string,
      shortDescription: PropTypes.string,
    }),
    intl: PropTypes.shape({
      formatMessage: PropTypes.func,
    }),
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }),
    todo: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      shortDescription: PropTypes.string,
      description: PropTypes.string,
      done: PropTypes.bool,
      favorite: PropTypes.bool,
    }),
    reqAddTodo: PropTypes.func,
    reqTodo: PropTypes.func,
    reqUpdateTodo: PropTypes.func,
    reqShowNotification: PropTypes.func,
    isSubmitting: PropTypes.bool,
    handleSubmit: PropTypes.func,
  };

  componentDidMount() {
    const { match: { params: { id } }, reqTodo } = this.props;

    if (id) {
      reqTodo(id);
    }
  }

  render() {
    const {
      errors,
      classes,
      intl,
      isSubmitting,
      handleSubmit,
      match: { params: { id } },
      todo: { title = '' },
    } = this.props;

    return (
      <Paper className={classes.root}>
        <PageHeader>
          {intl.formatMessage(messages[id ? 'pageTitleEdit' : 'pageTitle'], { name: title })}
        </PageHeader>
        <form
          noValidate
          className={classes.form}
          id="todoForm"
          onSubmit={handleSubmit}
        >
          <Field
            required
            error={!!errors.title}
            helperText={errors.title}
            type="text"
            label={intl.formatMessage(messages.fieldTitle)}
            name="title"
            component={StyledTextField}
          />

          <Field
            required
            error={!!errors.shortDescription}
            helperText={errors.shortDescription}
            label={intl.formatMessage(messages.fieldShortDescription)}
            name="shortDescription"
            multiline
            rows={2}
            rowsMax={4}
            component={StyledTextField}
          />

          <Field
            label={intl.formatMessage(messages.fieldDescription)}
            name="description"
            multiline
            rows={4}
            rowsMax={8}
            component={StyledTextField}
          />

          {isSubmitting && <LinearProgress />}
          <StyledButton
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            type="submit"
          >
            {intl.formatMessage(messages.saveButton)}
          </StyledButton>
        </form>
      </Paper>
    );
  }
}
export const handleSubmit = async (
  values, {
    props: {
      reqAddTodo,
      intl,
      reqUpdateTodo,
      match: { params: { id } },
      reqShowNotification,
    },
    setSubmitting,
    resetForm,
  },
) => {
  try {
    if (id) {
      await reqUpdateTodo(id, values);
      reqShowNotification({
        variant: 'success',
        message: intl.formatMessage(messages.updateSuccess),
      });
    } else {
      await reqAddTodo(values);
      reqShowNotification({
        variant: 'success',
        message: intl.formatMessage(messages.saveSuccess),
      });
      resetForm({});
    }

    setSubmitting(false);
  } catch (e) {
    reqShowNotification({
      variant: 'error',
      message: intl.formatMessage(messages.updateFail),
    });
    console.error(e); // eslint-disable-line no-console
  }
};

const mapPropsToValues = ({
  match: { params: { id } },
  todo: {
    title = '',
    description = '',
    shortDescription = '',
  },
}) => (id ? { title, description, shortDescription} : {
  title: '',
  description: '',
  shortDescription: ''}
);

const mapStateToProps = (state) => ({
  todo: selectTodo(state),
});

const mapDispatchToProps = (dispatch) => ({
  reqAddTodo: (todo) => dispatch(addTodo(todo)),
  reqTodo: (todoId) => dispatch(getTodo(todoId)),
  reqUpdateTodo: (todo, todoData) => dispatch(updateTodo(todo, todoData)),
  reqShowNotification: (notification) => dispatch(showNotification(notification)),
});

export default compose(
  injectIntl,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withFormik({
    enableReinitialize: true,
    mapPropsToValues,
    validate,
    displayName: 'todoForm',
    handleSubmit,
  }),
  withStyles(styles),
)(AddEditTodo);
