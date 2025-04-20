import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
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
        borderRadius: 32,
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
    horizontalContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        gap: 6,
        borderRadius: 32,
    },
    dataPoint: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 0,
        padding: '0 2px',
        borderRadius: 24,
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
    rupee: {
        fontWeight: 700,
        color: ' #007bff',
        fontSize: '2.2rem',
        letterSpacing: 0.3,
    },
    positive: {
        color: ' #1db954',
    },
    negative: {
        color: ' #e53935',
    }
}));

const DetailedPaper = (props) => {
    const classes = useStyles();
    return (
        <Paper elevation={4} className={classes.paper}>
            <Box className={classes.horizontalContainer}>
                <div className={classes.dataPoint}>
                    <Typography fontWeight="bold" fontSize="30px" className={`${classes.value} ${classes.rupee}`}>
                        {RUPEE_SYMBOL + " " + props.investedAmount}
                    </Typography>
                    <Typography fontSize="20px" className={classes.label}>Invested Value</Typography>
                </div>
                <div className={classes.dataPoint}>
                    <Typography fontWeight="bold" fontSize="30px" className={classes.value} style={{ color: props.isPositive ? ' #1db954' : ' #e53935' }}>
                        {props.totalReturn}
                    </Typography>
                    <Typography fontSize="20px" className={classes.label}>Total Return (%)</Typography>
                </div>
                <div className={classes.dataPoint}>
                    <Typography fontWeight="bold" fontSize="30px" className={classes.value} style={{ color: props.isDayPositive ? ' #1db954' : ' #e53935' }}>
                        {props.day1Change}
                    </Typography>
                    <Typography fontSize="20px" className={classes.label}>1 Day Change</Typography>
                </div>
            </Box>
        </Paper>
    );
}

export default DetailedPaper;