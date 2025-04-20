import React, { useState } from 'react';
import {
    Button,
    CircularProgress,
    Container,
    CssBaseline,
    TextField,
    Typography,
    Fade,
    InputAdornment,
    IconButton,
    Paper
} from '@mui/material';
import { makeStyles } from "@mui/styles";
import axios from 'axios';
import { COMMON_URL } from '../constants/URL';
import { Link, useNavigate } from 'react-router-dom';
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
        height: 160,
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
        fontSize: "1.2rem",
        color: " #222",
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

const SignUp = () => {
    const navigate = useNavigate();
    const classes = useStyles();
    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleVerifyOTP = async () => {
        if (!otp) {
            toast.error('OTP is required', {
                position: toast.POSITION.TOP_RIGHT,
                style: { backgroundColor: 'red', color: ' #ffffff' },
            });
            return;
        }

        setIsLoading(true);
        try {
            const userDetails = { username: username, otp: otp };
            const response = await axios.post(COMMON_URL + 'auth/verifyotp', userDetails);
            if (response.status === 200 && response.data.isValid) {
                toast.success(response.data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    style: { backgroundColor: 'green', color: ' #ffffff' },
                });
                navigate('/login');
            } else {
                toast.error(response.data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    style: { backgroundColor: 'red', color: ' #ffffff' },
                });
            }
        } catch (error) {
            console.error('Failed to send OTP:', error);
            toast.error('Failed to verify OTP. Please try again.', {
                position: toast.POSITION.TOP_RIGHT,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePhoneNumber = (phone) => {
        const re = /^\d{10}$/;
        return re.test(String(phone));
    };

    const handleChange = (e) => {
        const value = e.target.value;
        // Allow only integers and maximum length of 6
        if (/^\d*$/.test(value) && value.length <= 6) {
            setOtp(value);
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
    
        if (!username || !fullName || !emailId || !password || !phoneNumber) {
            toast.error('All fields are required', {
                position: toast.POSITION.TOP_RIGHT,
                style: { backgroundColor: 'red', color: ' #ffffff' },
            });
            return;
        }
    
        if (username.length < 4) {
            toast.error('Username must be at least 4 characters', {
                position: toast.POSITION.TOP_RIGHT,
                style: { backgroundColor: 'red', color: ' #ffffff' },
            });
            return;
        }
    
        if (fullName.length < 4) {
            toast.error('Full name must be at least 4 letters', {
                position: toast.POSITION.TOP_RIGHT,
                style: { backgroundColor: 'red', color: ' #ffffff' },
            });
            return;
        }
    
        if (!validateEmail(emailId)) {
            toast.error('Invalid email address', {
                position: toast.POSITION.TOP_RIGHT,
                style: { backgroundColor: 'red', color: ' #ffffff' },
            });
            return;
        }
    
        if (password.length < 4) {
            toast.error('Password must be at least 4 characters', {
                position: toast.POSITION.TOP_RIGHT,
                style: { backgroundColor: 'red', color: ' #ffffff' },
            });
            return;
        }
    
        if (!validatePhoneNumber(phoneNumber)) {
            toast.error('Phone number must be exactly 10 digits', {
                position: toast.POSITION.TOP_RIGHT,
                style: { backgroundColor: 'red', color: ' #ffffff' },
            });
            return;
        }
    
        setIsLoading(true);
        try {
            const userDetails = { username: username, emailId: emailId, password: password, phoneNumber: phoneNumber, fullName: fullName };
            const response = await axios.post(COMMON_URL + 'auth/signup', userDetails);
            if (response.status === 200 && response.data.isValid) {
                toast.success(response.data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    style: { backgroundColor: 'green', color: ' #ffffff' },
                });
                setIsOtpSent(true);
            } else {
                toast.error(response.data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    style: { backgroundColor: 'red', color: ' #ffffff' },
                });
            }
        } catch (error) {
            console.error('Signup failed:', error);
            toast.error('Signup failed. Please try again.', {
                position: toast.POSITION.TOP_RIGHT,
                style: { backgroundColor: 'red', color: ' #ffffff' },
            });
        } finally {
            setIsLoading(false);
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
                    <Typography className={classes.title}>
                        Sign Up
                    </Typography>
                    <form style={{ width: "100%" }} onSubmit={handleSignUp} autoComplete="off">
                        <Fade in={!isOtpSent}>
                            <div>
                                {!isOtpSent && (
                                    <>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            label="Username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            className={classes.input}
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
                                        />
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            label="Full Name"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            className={classes.input}
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
                                        />
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            label="Email Address"
                                            value={emailId}
                                            onChange={(e) => setEmailId(e.target.value)}
                                            className={classes.input}
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
                                        />
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            label="Phone Number"
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                            className={classes.input}
                                            InputLabelProps={{
                                                style: { background: " #f8fafc", color: "rgba(0, 0, 0, 0.64)", padding: "0 6px", fontWeight: 400, fontSize: 18 }
                                            }}
                                            InputProps={{
                                                style: { fontWeight: 500, fontSize: 18, borderRadius: 12, background: " #f8fafc" },
                                                maxLength: 10,
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
                                        />
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            className={classes.submitButton}
                                            onClick={handleSignUp}
                                            disabled={
                                                username.trim() === '' ||
                                                fullName.trim() === '' ||
                                                emailId.trim() === '' ||
                                                password.trim() === '' ||
                                                phoneNumber.trim() === ''
                                            }
                                            type="submit"
                                            sx={{ mt: 2 }}
                                        >
                                            Sign Up
                                        </Button>
                                    </>
                                )}
                            </div>
                        </Fade>
                        <Fade in={isOtpSent}>
                            <div>
                                {isOtpSent && (
                                    <>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            label="OTP"
                                            value={otp}
                                            onChange={handleChange}
                                            className={classes.input}
                                            InputLabelProps={{
                                                style: { background: " #f8fafc", color: "rgba(0, 0, 0, 0.64)", padding: "0 6px", fontWeight: 400, fontSize: 18 }
                                            }}
                                            InputProps={{
                                                style: { fontWeight: 500, fontSize: 18, borderRadius: 12, background: " #f8fafc" },
                                                maxLength: 6
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
                                        />
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            className={classes.submitButton}
                                            onClick={handleVerifyOTP}
                                            disabled={otp.trim() === ''}
                                            type="submit"
                                            sx={{ mt: 2 }}
                                        >
                                            Verify OTP
                                        </Button>
                                    </>
                                )}
                            </div>
                        </Fade>
                    </form>
                    <Link to="/login" className={classes.link}>
                        Have an account? <span style={{ color: " rgb(255, 145, 0)" }}>Log In</span>
                    </Link>
                </Paper>
            </Container>
        </div>
    );
};

export default SignUp;