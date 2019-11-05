import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';

import Content from './Content';

const Notification = ({ open, message, variant, position}) => {

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: position.vertical,
          horizontal: position.horizontal,
        }}
        open={open}
        autoHideDuration={3000}
      >
        <Content
          variant={variant}
          message={message}
        />
      </Snackbar>
      />
    </div>
  );
}

Notification.defaultProps = {
    variant: 'info',
    position: {
        vertical: 'top',
        horizontal: 'right',
    }
}

Notification.propTypes = {
    open: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
    position: PropTypes.object,
}

export default Notification;