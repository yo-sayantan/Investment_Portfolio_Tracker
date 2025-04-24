import React, { useState } from 'react';
import { LineChart, Line, YAxis, XAxis, Tooltip, Legend, ResponsiveContainer, ReferenceLine, CartesianGrid } from 'recharts';
import { makeStyles } from '@mui/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { COMMON_URL } from '../../constants/URL';

function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', options);
}

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div
                style={{
                    background: ' #ffffff',
                    border: '1px solid #e0e0e0',
                    borderRadius: 8,
                    padding: 12,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    minWidth: 180
                }}
            >
                <div style={{ fontWeight: 600, marginBottom: 4 }}>Day: {formatDate(data.date)}</div>
                <div style={{ color: ' #8884d8' }}>Invested Amount: <b>{Math.round(data.investedAmount)}</b></div>
                <div style={{ color: ' #82ca9d' }}>Current Amount: <b>{Math.round(data.currentAmount)}</b></div>
            </div>
        );
    }
    return null;
};

const useStyles = makeStyles({
    chartContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '98%',
        height: '60vh',
        background: "linear-gradient(90deg, #e3f0ff 0%, #f8fafc 100%)",
        borderRadius: 16,
        boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
        padding: 6,
        marginTop: 10,
    },
    chartOptions: {
        display: 'flex',
        justifyContent: 'center',
        gap: '30px',
        margin: '80px',
    },
    button: {
        borderRadius: 20,
        border: '1.5px solid #007bff',
        padding: '6px 22px',
        cursor: 'pointer',
        background: ' #ffffff',
        color: ' #007bff',
        fontWeight: 600,
        fontSize: 16,
        transition: 'all 0.2s',
        boxShadow: '0 1px 4px rgba(0,123,255,0.08)',
        outline: 'none',
        '&:hover': {
            background: ' #007bff',
            color: ' #ffffff',
        },
    },
    activeButton: {
        background: ' #007bff',
        color: ' #ffffff',
        borderColor: ' #007bff',
    },
    loadingContainer: {
        minHeight: '60vh',
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
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
});

const InvestmentChart = () => {
    const [timeframe, setTimeframe] = useState('1M');
    const [cookies] = useCookies(['access_token']);
    const [data, setData] = useState([]);
    const classes = useStyles();
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            setLoading(true);
            axios.defaults.headers.common['Authorization'] = cookies['access_token'];
            const res = await axios.get(COMMON_URL + "app/get-line-chart");
            if (res.status === 200) {
                setData(res.data);
            }
        } catch (error) {
            console.error('Error calling one or more APIs', error);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    const filteredData =
        timeframe === '1M'
            ? data.slice(-30)
            : timeframe === '6M'
                ? data.slice(-180)
                : timeframe === '1Y'
                    ? data.slice(-365)
                    : data;

    return (
        <div className={classes.chartContainer}>
            {loading ? (
                <div className={classes.loadingContainer}>
                    <CircularProgress className={classes.spinner} thickness={4.5} />
                    <Typography className={classes.loadingText}>Loading...</Typography>
                </div>
            ) : (
                <>
                    <div style={{ width: '100%', height: '180%' }}>
                        <ResponsiveContainer width="100%" height={700}>
                            <LineChart data={filteredData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke=" #e0e0e0" />
                                <XAxis
                                    dataKey="date"
                                    tickFormatter={formatDate}
                                    minTickGap={30}
                                    tick={{ fontSize: 13, fill: ' #888' }}
                                />
                                <YAxis
                                    tick={{ fontSize: 13, fill: ' #888' }}
                                    width={60}
                                    tickCount={10}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend
                                    verticalAlign="top"
                                    align="right"
                                    iconType="circle"
                                    wrapperStyle={{ paddingBottom: 8 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="investedAmount"
                                    stroke=" #8884d8"
                                    strokeWidth={3}
                                    dot={false}
                                    activeDot={{ r: 6 }}
                                    name="Invested Amount"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="currentAmount"
                                    stroke=" #82ca9d"
                                    strokeWidth={3}
                                    dot={false}
                                    activeDot={{ r: 6 }}
                                    name="Current Amount"
                                />
                                <ReferenceLine y={0} stroke=" #aaaaaa" strokeWidth={1} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className={classes.chartOptions}>
                        {['1M', '6M', '1Y', 'All'].map((label) => (
                            <button
                                key={label}
                                className={`${classes.button} ${timeframe === label ? classes.activeButton : ''}`}
                                onClick={() => setTimeframe(label)}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default InvestmentChart;