import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    minWidth: 320,
    width: '100%',
    minHeight: 180,
    background: 'linear-gradient(135deg, #f8fafc 60%, #e3f0ff 100%)',
    borderRadius: 24,
    boxShadow: '0 8px 32px rgba(0,123,255,0.10), 0 1.5px 8px rgba(0,0,0,0.04)',
    padding: '32px 3vw 28px 3vw', // Responsive horizontal padding
    margin: 'auto',
    transition: 'box-shadow 0.2s',
    border: '1.5px solid #e3eafc',
    '&:hover': {
        boxShadow: '0 12px 48px rgba(0,123,255,0.15), 0 2px 16px rgba(0,0,0,0.08)',
        borderColor: 'rgba(186, 199, 212, 0.47)',
    }
  },
  horizontalContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    gap: 6,
  },
  dataPoint: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 0,
    padding: '0 2px',
  },
  label: {
    fontSize: '1.3rem',
    fontWeight: 900,
    color: ' #222',
    letterSpacing: 0.2,
    marginTop: 8,
    opacity: 0.85,
    textAlign: 'center',
  },
  value: {
    fontSize: '2.2rem',
    fontWeight: 900,
    letterSpacing: 0.3,
    marginBottom: 0,
    textShadow: '0 1px 4px rgba(0,123,255,0.06)',
    wordBreak: 'break-word',
    color: ' #222',
    textAlign: 'center',
  },
}));

const Nifty50Paper = (props) => {
  const classes = useStyles();

  let xirrValue = props.xirr || props.XIRR || "N/A";
  let color = "inherit";
  if (typeof xirrValue === "string" && xirrValue !== "N/A") {
    const num = parseFloat(xirrValue.replace("%", "").trim());
    if (!isNaN(num)) {
      color = num >= 0 ? "rgb(4, 153, 56)" : "rgb(226, 42, 39)";
    }
  }

  return (
    <Paper elevation={3} className={classes.paper}>
      <Box className={classes.horizontalContainer}>
        
        <div className={classes.dataPoint}>
            <Typography fontWeight="bold" fontSize="50px" className={classes.value} style={{ color }}>
                {xirrValue}
            </Typography>
            <Typography fontSize="25px" className={classes.label}>XIRR</Typography>
        </div>
      </Box>
    </Paper>
  );
};

export default Nifty50Paper;
