import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Paper, Box, Typography, CircularProgress } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import axios from "axios";
import { COMMON_URL } from "../../constants/URL";

// Define some colors for the pie slices
const COLORS = [
    " #007bff", " #00c6ff", " #ff9140", " #82ca9d", " #8884d8", " #ffc658", " #e53935", " #1db954", " #ffb199", " #b71c1c"
];

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <Paper elevation={3} sx={{ p: 2, background: " #ffffff" }}>
                <Typography variant="subtitle2" color="text.primary">
                    {payload[0].name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Current: <b>₹{payload[0].value.toLocaleString()}</b>
                </Typography>
            </Paper>
        );
    }
    return null;
};

const FundPieChart = () => {
    const [cookies] = useCookies(["access_token"]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            axios.defaults.headers.common['Authorization'] = cookies['access_token'];
            const res = await axios.get(COMMON_URL + "app/get-pie-chart");
            if (res.status === 200) {
                setData(
                    res.data.map(item => ({
                        name: item.schemeName,
                        value: item.investedAmount
                    }))
                );
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

    return (
        <Box
            sx={{
                width: "100%",
                height: 1020,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(90deg, #e3f0ff 0%, #f8fafc 100%)",
                borderRadius: 4,
                boxShadow: "0 2px 16px rgba(0,123,255,0.08)",
                p: 2,
            }}
        >
            {loading ? (
                <CircularProgress color="primary" />
            ) : data.length === 0 ? (
                <Typography color="text.secondary">No data available</Typography>
            ) : (
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            nameKey="name"
                            dataKey="value"
                            cx="50%"
                            cy="50%"
                            outerRadius={440}
                            innerRadius={220}
                            fill=" #007bff"
                            labelLine={false}
                        >
                            {data.map((entry, index) => (
                                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                </ResponsiveContainer>
            )}
        </Box>
    );
};

export default FundPieChart;