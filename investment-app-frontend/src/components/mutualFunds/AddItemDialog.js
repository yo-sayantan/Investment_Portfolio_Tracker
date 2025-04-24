import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button,
    Grid,
    Box,
    OutlinedInput,
    useMediaQuery
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';
import { COMMON_URL } from '../../constants/URL';
import { useCookies } from 'react-cookie';
import { DD_MM_YYYY } from '../../constants/DateFormat';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from '@mui/material/styles';

const AddItemDialog = (props) => {
    const [cookies, setCookie] = useCookies(['access_token']);
    const [id, setId] = useState(null);
    const [mutualFund, setMutualFund] = useState('');
    const [investedAmount, setInvestedAmount] = useState('');
    const [side, setSide] = useState('');
    const [date, setDate] = useState(dayjs(new Date()));

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const updateStateWithNewData = (newData) => {
        if (newData) {
            setId(newData.id);
            setMutualFund(newData.mutualFund.schemeCode);
            setInvestedAmount(newData.amount);
            setSide(newData.side);
            setDate(dayjs(newData.dateOfEvent));
        } else {
            setId(null);
            setMutualFund('');
            setInvestedAmount('');
            setSide('');
            setDate(dayjs(new Date()));
        }
    };

    useEffect(() => {
        updateStateWithNewData(props.selectedRowData);
    }, [props.selectedRowData]);

    const isAnyFieldEmpty = () => {
        return !mutualFund || !investedAmount || !side;
    };

    const handleAdd = () => {
        props.setAddLoader(true);
        props.onClose();
        axios.defaults.headers.common['Authorization'] = cookies['access_token'];
        const data = { id: id, mutualFund: { schemeCode: mutualFund }, side: side, amount: investedAmount, dateOfEvent: date };
        axios.post(COMMON_URL + "app/save-order-detail", data).then((res) => {
            toast.success(res.data, {
                position: toast.POSITION.TOP_RIGHT,
                style: { backgroundColor: 'green', color: ' #ffffff' },
            });
            props.updateData();
        }).catch((error) => {
            toast.error(error.response.data, {
                position: toast.POSITION.TOP_RIGHT,
                style: { backgroundColor: 'red', color: ' #ffffff' },
            });
            props.setAddLoader(false);
        }).finally(() => {
            setMutualFund('');
            setInvestedAmount('');
            setSide('');
            setDate(dayjs(new Date()));
        })
    };

    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
            fullScreen={fullScreen}
            PaperProps={{
                sx: {
                    borderRadius: 4,
                    background: "linear-gradient(120deg, #f8fafc 80%, #e3f0ff 100%)",
                    boxShadow: "0 8px 32px rgba(0,123,255,0.18)",
                    minWidth: { xs: "90vw", sm: 480 },
                    p: { xs: 1, sm: 3 }
                }
            }}
        >
            <DialogTitle
                sx={{
                    fontWeight: 900,
                    fontSize: "2rem",
                    color: " #007bff",
                    textAlign: "center",
                    letterSpacing: 1.2,
                    background: "linear-gradient(90deg, #e3f0ff 0%, #f8fafc 100%)",
                    borderRadius: "16px 16px 0 0",
                    mb: 1
                }}
            >
                {props.itemType} Item
            </DialogTitle>
            <DialogContent>
                <form>
                    <Grid container spacing={3} sx={{ mt: 1 }}>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel
                                    sx={{
                                        background: " #ffffff",
                                        px: 0.5,
                                        color: " rgb(75, 75, 75)",
                                        fontWeight: 500,
                                        zIndex: 2,
                                        '&.Mui-focused': {
                                            color: "rgb(75, 75, 75)",
                                            background: " #ffffff",
                                        },
                                        '&.MuiInputLabel-shrink': {
                                            background: " #ffffff",
                                        }
                                    }}
                                >
                                    Mutual Fund
                                </InputLabel>
                                <Select
                                    value={mutualFund}
                                    onChange={(e) => setMutualFund(e.target.value)}
                                    input={
                                        <OutlinedInput
                                            label="Mutual Fund"
                                            sx={{
                                                background: " #ffffff",
                                                borderRadius: 2,
                                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: ' #007bff',
                                                    borderWidth: 2,
                                                },
                                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: ' #007bff',
                                                    borderWidth: 2,
                                                },
                                            }}
                                        />
                                    }
                                    fullWidth
                                    sx={{
                                        background: " #ffffff",
                                        borderRadius: 2,
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: ' #bdbdbd',
                                        },
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: ' #007bff',
                                            borderWidth: 2,
                                        },
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: ' #007bff',
                                            borderWidth: 2,
                                        },
                                    }}
                                >
                                    {props.mutualFundData.map((item) => (
                                        <MenuItem key={item.schemeCode} value={item.schemeCode}>
                                            {item.schemeName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel
                                    sx={{
                                        background: " #ffffff",
                                        px: 0.5,
                                        color: " rgb(75, 75, 75)",
                                        fontWeight: 500,
                                        zIndex: 2,
                                        '&.Mui-focused': {
                                            color: "rgb(75, 75, 75)",
                                            background: " #ffffff",
                                        },
                                        '&.MuiInputLabel-shrink': {
                                            background: " #ffffff",
                                        }
                                    }}
                                >
                                    Amount
                                </InputLabel>
                                <OutlinedInput
                                    label="Amount"
                                    type="number"
                                    step="0.01"
                                    value={investedAmount}
                                    onChange={(e) => setInvestedAmount(e.target.value)}
                                    sx={{
                                        background: " #ffffff",
                                        borderRadius: 2,
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: ' #bdbdbd',
                                        },
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: ' #007bff',
                                            borderWidth: 2,
                                        },
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: ' #007bff',
                                            borderWidth: 2,
                                        },
                                    }}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel
                                    sx={{
                                        background: " #ffffff",
                                        px: 0.5,
                                        color: " rgb(75, 75, 75)",
                                        fontWeight: 500,
                                        zIndex: 2,
                                        '&.Mui-focused': {
                                            color: "rgb(75, 75, 75)",
                                            background: " #ffffff",
                                        },
                                        '&.MuiInputLabel-shrink': {
                                            background: " #ffffff",
                                        }
                                    }}
                                >
                                    Side (Buy/Sell)
                                </InputLabel>
                                <Select
                                    value={side}
                                    onChange={(e) => setSide(e.target.value)}
                                    input={
                                        <OutlinedInput
                                            label="Side (Buy/Sell)"
                                            sx={{
                                                background: " #ffffff",
                                                borderRadius: 2,
                                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: ' #007bff',
                                                    borderWidth: 2,
                                                },
                                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: ' #007bff',
                                                    borderWidth: 2,
                                                },
                                            }}
                                        />
                                    }
                                    fullWidth
                                    sx={{
                                        background: " #ffffff",
                                        borderRadius: 2,
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: ' #bdbdbd',
                                        },
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: ' #007bff',
                                            borderWidth: 2,
                                        },
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: ' #007bff',
                                            borderWidth: 2,
                                        },
                                    }}
                                >
                                    <MenuItem value="Buy">Buy</MenuItem>
                                    <MenuItem value="Sell">Sell</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    value={date}
                                    onChange={(newDate) => setDate(newDate)}
                                    format={DD_MM_YYYY}
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            variant: "outlined",
                                            sx: {
                                                background: " #ffffff",
                                                borderRadius: 2,
                                                '& .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: ' #bdbdbd',
                                                },
                                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: ' #007bff',
                                                    borderWidth: 2,
                                                },
                                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: ' #007bff',
                                                    borderWidth: 2,
                                                },
                                            }
                                        }
                                    }}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={6}>
                            <Box display="flex" justifyContent="flex-end">
                                <Button
                                    variant="contained"
                                    onClick={handleAdd}
                                    disabled={isAnyFieldEmpty()}
                                    sx={{
                                        background: "linear-gradient(90deg, #007bff 0%, #00c6ff 100%)",
                                        color: " #ffffff",
                                        fontWeight: 600,
                                        fontSize: "1.2rem",
                                        borderRadius: 2,
                                        px: 4,
                                        py: 1.5,
                                        boxShadow: "0 2px 8px rgba(0,123,255,0.12)",
                                        textTransform: "none",
                                        '&:hover': {
                                            background: "linear-gradient(90deg, #0056b3 0%, #00aaff 100%)"
                                        }
                                    }}
                                >
                                    {props.itemType}
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box display="flex" justifyContent="flex-start">
                                <Button
                                    variant="contained"
                                    onClick={props.onClose}
                                    sx={{
                                        background: "linear-gradient(90deg, #e53935 0%, #ffb199 100%)",
                                        color: " #ffffff",
                                        fontWeight: 600,
                                        fontSize: "1.2rem",
                                        borderRadius: 2,
                                        px: 4,
                                        py: 1.5,
                                        boxShadow: "0 2px 8px rgba(229,57,53,0.12)",
                                        textTransform: "none",
                                        '&:hover': {
                                            background: "linear-gradient(90deg, #b71c1c 0%, #ff8a65 100%)"
                                        }
                                    }}
                                >
                                    Cancel
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddItemDialog;