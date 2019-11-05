import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@material-ui/core';

import messages from './messages';

const Modal = ({
    open,
    onClose,
    onConfirm,
    onCancel,
    content,
    title,
    cancelText,
    confirmText
}) => <Dialog
    open={open}
    onClose={onClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
>
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {content}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={onCancel && onCancel || onClose} color="primary">
                {cancelText}
          </Button>
            <Button onClick={onConfirm} color="primary" autoFocus>
                {confirmText}
          </Button>
        </DialogActions>
    </Dialog>

Modal.defaultProps = {
    cancelText: <FormattedMessage {...messages.cancel} />,
    confirmText: <FormattedMessage {...messages.confirm} />,
    title: <FormattedMessage {...messages.title} />
};

Modal.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    content: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    cancelText: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    confirmText: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
};

export default Modal;