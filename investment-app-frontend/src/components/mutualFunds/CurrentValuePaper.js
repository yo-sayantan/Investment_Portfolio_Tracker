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
        padding: '22px 3vw 10px 3vw',
        margin: 'auto',
        transition: 'box-shadow 0.2s',
        border: '1.5px solid #e3eafc',
        '&:hover': {
            boxShadow: '0 12px 48px rgba(0,123,255,0.15), 0 2px 16px rgba(0,0,0,0.08)',
            borderColor: 'rgba(186, 199, 212, 0.47)',
        }
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
}));

const CurrentValuePaper = (props) => {
    const classes = useStyles();
    let color = "inherit";
    if (props.amount) {
        color = props.amount >= 0 ? "rgb(4, 153, 56)" : "rgb(226, 42, 39)";
    }

    return (
        <Paper elevation={3} className={classes.paper}>
            <Typography fontWeight="bold" fontSize="50px" className={classes.value} style={{ color }}>
                {RUPEE_SYMBOL + " " + props.amount}
            </Typography>
            <Typography fontSize="22px" className={classes.label}>Current Value</Typography>
        </Paper>
    );
}

export default CurrentValuePaper;