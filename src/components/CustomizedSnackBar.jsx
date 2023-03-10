import * as React from 'react';
import { useContext } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { SnackBarContext } from '../context/customizedSnakabrContext';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars({ message }) {
  const { snackbarOpen, handleCloseSnackBar } = useContext(SnackBarContext);

  return (
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={6000}
      onClose={handleCloseSnackBar}
    >
      <Alert
        onClose={handleCloseSnackBar}
        severity="success"
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
