import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  loading: {
    minHeight: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(120deg, #f8fafc 80%, #e3f0ff 100%)',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 9999,
  },
  spinner: {
    marginBottom: 24,
    color: '#007bff !important',
    animation: '$spin 1.2s linear infinite',
    width: 70,
    height: 70,
  },
  loadingText: {
    color: '#007bff',
    fontWeight: 700,
    fontSize: '1.5rem',
    letterSpacing: 1.2,
    textShadow: '0 2px 8px rgba(0,123,255,0.10)',
    margin: 0,
  },
  '@keyframes spin': {
    '100%': { transform: 'rotate(360deg)' }
  }
}));

const Loading = () => {
  const classes = useStyles();

  return (
    <div className={classes.loading}>
      <CircularProgress className={classes.spinner} thickness={4.5} />
      <p className={classes.loadingText}>Loading...</p>
    </div>
  );
};

export default Loading;