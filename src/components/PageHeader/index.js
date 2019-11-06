import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { styled } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

const StyledTypography = styled(Typography)({
  padding: '20px 20px 10px 20px',
});

const PageHeader = ({ children }) => (
  <>
    <StyledTypography variant="h5" gutterBottom>
      {children}
    </StyledTypography>
    <Divider />
  </>
);

PageHeader.propTypes = {
  children: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
};

export default PageHeader;
