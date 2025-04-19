import React from 'react';
import { Paper, Typography } from '@mui/material';
import { RUPEE_SYMBOL } from '../../constants/Currency';
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
}));

const CurrentValuePaper = (props) => {
    const classes = useStyles();
    return (
        <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" color={props.isPositive ? "green" : "red"} fontWeight="bold" fontSize="45px">
                {RUPEE_SYMBOL + " " + props.amount}
            </Typography>
            <Typography fontSize="20px">
                Current Value
            </Typography>
        </Paper>
    );
}

export default CurrentValuePaper;