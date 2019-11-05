import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import { injectIntl } from 'react-intl';
import { Field, withFormik } from 'formik';
import { compose } from "redux";
import { connect } from "react-redux";
import {
  Button,
  LinearProgress,
  FormControlLabel,
  Paper,
  Switch
} from '@material-ui/core';
import { TextField } from "material-ui-formik-components/TextField";

import { withStyles } from '@material-ui/core/styles';

import { showNotification } from "../../actions/notificationsActions";
import { getTodo, addTodo, updateTodo } from "../../actions/todoFormActions";
import { selectTodo } from '../../selectors/todoList';

import validate from './validate';
import messages from './messages';

const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
    padding: 20,
  },
});

const FormSwitch = ({ name, label, ...props}) => (<FormControlLabel

control={
  <Field 
    name={name}
label={label}
    render={({field, form: { errors, touched }}) => {
      console.log(props)
      return(<Switch 
        checked={!!field.value}
        error={touched[name] && errors[name]}
        input={{
          ...field,
          checked: field.value,
          value:  field.value
        }}
        name={name}
        {...props} 
        />)
    }
      
    }
    />
}
/>)

class AddEditTodo extends Component {
  static propTypes = {
    todo: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      shortDescription: PropTypes.string,
      shortDescription: PropTypes.string,
      done: PropTypes.bool,
      favorite: PropTypes.bool,
    }),
    addTodo: PropTypes.func,
    reqTodo: PropTypes.func,
    updateTodo: PropTypes.func,
    showNotification: PropTypes.func,
  };

  componentDidMount() {
    const { match: { params: { id } }, reqTodo } = this.props

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
      submitForm,
      handleSubmit,
    } = this.props;
console.log(this.props)
    return (
      <Paper className={classes.root}>
        <form noValidate id="todoForm" onSubmit={handleSubmit} >
          <Field
            required
            error={!!errors.title}
            helperText={errors.title}
            type="text"
            label={intl.formatMessage(messages.fieldTitle)}
            name="title"
            component={TextField}
          />
          <br />
          <FormSwitch     label="Favorite" 
    name="favorite"  />
          <br />

          <Field
            required
            error={!!errors.shortDescription}
            helperText={errors.shortDescription}
            label={intl.formatMessage(messages.fieldFavorite)}
            name="shortDescription"
            multiline={true}
            rows={2}
            rowsMax={4}
            component={TextField}
          />

          <Field
            label={intl.formatMessage(messages.fieldDescription)}
            name="description"
            multiline={true}
            rows={4}
            rowsMax={8}
            component={TextField}
          />

          {isSubmitting && <LinearProgress />}
          <br />
          <Button
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            type="submit"
          >
            {intl.formatMessage(messages.saveButton)}
          </Button>
        </form>
      </Paper>
    );
  }
}
export const handleSubmit = async (
  values, {
    props: { 
      addTodo, 
      intl,
      updateTodo, 
      match: { params: { id } }, 
      showNotification,
    },
    setSubmitting,
    resetForm
  }
) => {
  try {
    if (id) {
      await updateTodo(id, values)
      showNotification({
        variant: 'success',
        message: intl.formatMessage(messages.updateSuccess)
      });
    } else {
      await addTodo(values);
      showNotification({
        variant: 'success',
        message: intl.formatMessage(messages.saveSuccess)
      });
      resetForm({ favorite: false });
    }
    
    setSubmitting(false);
  }
  catch (e) {
    showNotification({
      variant: 'error',
      message: intl.formatMessage(messages.updateFail)
    });
    console.error(e);
  }
}

const mapPropsToValues = ({ todo: {
  title = '',
  favorite = false,
  description = '',
  shortDescription = ''
} }) => ({ title, favorite, description, shortDescription })

const mapStateToProps = state => ({
  todo: selectTodo(state)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  addTodo: todo => dispatch(addTodo(todo)),
  reqTodo: todoId => dispatch(getTodo(todoId)),
  updateTodo: (todo, todoData) => dispatch(updateTodo(todo, todoData)),
  showNotification: notification => dispatch(showNotification(notification)),
});

export default compose(
  injectIntl,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withFormik({
    enableReinitialize: true,
    mapPropsToValues,
    validate,
    displayName: 'todoForm',
    handleSubmit,
  }),
  withStyles(styles)
)(AddEditTodo);
