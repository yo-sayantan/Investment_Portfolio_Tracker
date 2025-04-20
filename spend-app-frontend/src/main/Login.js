import React, { useState } from 'react';
import {
    Button,
    CircularProgress,
    Container,
    CssBaseline,
    TextField,
    Typography,
    InputAdornment,
    IconButton,
    Paper
} from '@mui/material';
import { makeStyles } from "@mui/styles";
import axios from 'axios';
import { COMMON_URL } from '../constants/URL';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state/ActionCreator';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import logo from './assets/logo.png';
import bgImage from './assets/background.jpg';

const useStyles = makeStyles(() => ({
    root: {
        minHeight: '100vh',
        width: '100vw',
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'relative'
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0, 0, 0, 0.2)',
        zIndex: 1
    },
    paper: {
        padding: '40px 32px',
        borderRadius: 18,
        boxShadow: "0 8px 32px rgba(0,123,255,0.12)",
        background: " #fff",
        minWidth: 350,
        maxWidth: 400,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        zIndex: 2,
        marginLeft: '22vw',
    },
    logo: {
        width: 364,
        height: 120,
        marginBottom: 12,
        objectFit: "contain",
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,123,255,0.10)"
    },
    productName: {
        fontWeight: 1200,
        fontSize: "3rem",
        color: " #007bff",
        marginBottom: 8,
        letterSpacing: 1.2,
        textAlign: "center"
    },
    title: {
        fontWeight: 700,
        fontSize: "1.3rem",
        color: " #222222",
        marginBottom: 24,
        letterSpacing: 1.1,
        textAlign: "center"
    },
    input: {
        marginBottom: 20,
        background: " #f8fafc",
        borderRadius: 8,
    },
    submitButton: {
        background: "linear-gradient(90deg, #007bff 0%, #00c6ff 100%)",
        color: " #ffffff",
        fontWeight: 700,
        fontFamily: "Roboto, sans-serif",
        fontSize: "1.3rem",
        borderRadius: 8,
        px: 4,
        py: 1.5,
        boxShadow: "0 2px 8px rgba(0,123,255,0.12)",
        textTransform: "none",
        marginTop: 8,
        marginBottom: 8,
        transition: "background 0.2s, color 0.2s, box-shadow 0.2s",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        '&:disabled': {
            background: "linear-gradient(90deg,rgb(99, 99, 99) 0%,rgb(187, 187, 187) 100%) !important",
            color: "rgba(85, 85, 85, 0.36) !important",
            fontWeight: 700,
            boxShadow: "0 2px 8px rgba(0,123,255,0.12)",
        },
        '&:enabled': {
            background: "linear-gradient(90deg, #007bff 0%, #00c6ff 100%) !important",
            color: 'rgb(255, 255, 255) !important',
            fontWeight: 900,
            boxShadow: '0 4px 16px rgba(0,123,255,0.18)',
        },
        '&:focus': {
            background: "linear-gradient(90deg, #007bff 0%, #00c6ff 100%) !important",
            color: " #ffffff !important",
            fontWeight: 700,
            boxShadow: "0 2px 8px rgba(0,123,255,0.12)",
        },
        '&:hover': {
            background: 'linear-gradient(90deg,rgb(255, 145, 0) 0%,rgb(255, 212, 119) 100%) !important',
            color: 'rgb(255, 255, 255) !important',
            fontWeight: 900,
            boxShadow: '0 4px 16px rgba(0,123,255,0.18)',
        }
    },
    link: {
        color: " #007bff",
        fontWeight: 600,
        textDecoration: "none",
        marginTop: 16,
        display: "block",
        textAlign: "center",
        '&:hover': {
            textDecoration: "underline"
        }
    },
    blurBackground: {
        backdropFilter: 'blur(5px)',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
    },
}));

const Login = () => {
    const navigate = useNavigate();
    const classes = useStyles();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [cookies, setCookie] = useCookies(['access_token']);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const actions = bindActionCreators(actionCreators, dispatch);

    const handleLogin = async (e) => {
        if (username === '' || password === '') {
            toast.error('Username and password are required', {
                position: toast.POSITION.TOP_RIGHT,
                style: { backgroundColor: 'red', color: ' #ffffff' },
            });
            return;
        }
        e.preventDefault();
        setIsLoading(true);
        try {
            const credentials = { username: username, password: password };
            const response = await axios.post(COMMON_URL + 'auth/authenticate', credentials);
            if (response.status === 200) {
                let expires = new Date();
                expires.setTime(expires.getTime() + (1000 * 60 * 60 * 24 * 2))
                setCookie('access_token', response.data.token, { expires });
                actions.loginAction(response.data.userDetails);
                navigate('/dashboard');
            }
            else {
                toast.error('Incorrect Username or password.', {
                    position: toast.POSITION.TOP_RIGHT,
                    style: { backgroundColor: 'red', color: ' #ffffff' },
                });
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Login failed:', error);
            toast.error('Incorrect Username or password.', {
                position: toast.POSITION.TOP_RIGHT,
                style: { backgroundColor: 'red', color: ' #ffffff' },
            });
            setIsLoading(false);
        }
    };

    const handlePasswordKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleLogin(e);
        }
    };

    return (
        <div className={classes.root}>
            <div className={classes.overlay} />
            {isLoading && <div className={classes.blurBackground}><CircularProgress /></div>}
            <Container component="main" maxWidth="xs" sx={{ zIndex: 2 }}>
                <CssBaseline />
                <Paper elevation={6} className={classes.paper}>
                    <img src={logo} alt="Investment Portfolio Tracker Logo" className={classes.logo} />
                    {/* <Typography className={classes.productName}>
                        Investment Portfolio Tracker
                    </Typography> */}
                    <Typography className={classes.title}>
                        Sign in to your account
                    </Typography>
                    <form style={{ width: "100%" }} onSubmit={handleLogin} autoComplete="off">
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={classes.input}
                            autoFocus
                            InputLabelProps={{
                                style: { background: " #f8fafc", color: "rgba(0, 0, 0, 0.64)", padding: "0 6px", fontWeight: 400, fontSize: 18 }
                            }}
                            InputProps={{
                                style: { fontWeight: 500, fontSize: 18, borderRadius: 12, background: " #f8fafc" },
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: ' #bdbdbd',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: ' #007bff',
                                        borderWidth: 2,
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: ' #007bff',
                                        borderWidth: 2,
                                    },
                                }
                            }}
                            onKeyPress={handlePasswordKeyPress}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={classes.input}
                            InputLabelProps={{
                                style: { background: " #f8fafc", color: "rgba(0, 0, 0, 0.64)", padding: "0 6px", fontWeight: 400, fontSize: 18 }
                            }}
                            InputProps={{
                                style: { fontWeight: 500, fontSize: 18, borderRadius: 12, background: " #f8fafc" },
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPassword((show) => !show)}
                                            edge="end"
                                            tabIndex={-1}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: ' #bdbdbd',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: ' #007bff',
                                        borderWidth: 2,
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: ' #007bff',
                                        borderWidth: 2,
                                    },
                                }
                            }}
                            onKeyPress={handlePasswordKeyPress}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            className={classes.submitButton}
                            onClick={handleLogin}
                            type="submit"
                            disabled={username.trim() === '' || password.trim() === ''}
                            sx={{ mt: 2 }}
                        >
                            Login
                        </Button>
                    </form>
                    <Link to="/signup" className={classes.link}>
                        Don't have an account? <span style={{ color: " rgb(255, 145, 0)" }}>Sign Up</span>
                    </Link>
                </Paper>
            </Container>
        </div>
    );
};

export default Login;