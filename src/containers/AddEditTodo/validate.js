import messages from './messages';

export default (values, { intl }) => {
  const errors = {};
  if (!values.title) {
    errors.title = intl.formatMessage(messages.fieldRequired);
  }
  if (!values.shortDescription) {
    errors.shortDescription = intl.formatMessage(messages.fieldRequired);
  }

  return errors;
};
