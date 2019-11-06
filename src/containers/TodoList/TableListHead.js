import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  TableHead,
  TableRow,
  TableCell,
} from '@material-ui/core';

const TableListHead = ({ tableTranslationLabels }) => (
  <TableHead>
    <TableRow>
      {tableTranslationLabels.map((traslation) => (
        <TableCell key={traslation.id}>
          <FormattedMessage {...traslation} />
        </TableCell>
      ))}
    </TableRow>
  </TableHead>
);

TableListHead.defaultProps = {
  tableTranslationLabels: [],
};

TableListHead.propTypes = {
  tableTranslationLabels: PropTypes.arrayOf(PropTypes.object),
};

export default TableListHead;
