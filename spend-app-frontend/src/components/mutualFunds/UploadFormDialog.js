import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
    InputAdornment,
    IconButton,
    Paper
} from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { COMMON_URL } from '../../constants/URL';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const UploadFormDialog = ({ open, onClose }) => {
    const [cookies] = useCookies(['access_token']);
    const [selectedFile, setSelectedFile] = useState(null);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileName = file.name.toLowerCase();
            if (fileName.endsWith('.pdf')) {
                setSelectedFile(file);
            } else {
                event.target.value = null;
                toast.error('Please select a valid .pdf file.', {
                    position: toast.POSITION.TOP_RIGHT,
                    style: { backgroundColor: 'red', color: '#fff' },
                });
            }
        }
    };

    const handleCancel = () => {
        setSelectedFile(null);
        setPassword('');
        onClose();
    };

    const handleSubmit = () => {
        if (password && selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('password', password);
            axios.defaults.headers.common['Authorization'] = cookies['access_token'];
            axios.post(COMMON_URL + 'app/bulk-upload', formData)
                .then((response) => {
                    if (response.status === 200) {
                        toast.success('Successfully uploaded file.', {
                            position: toast.POSITION.TOP_RIGHT,
                            style: { backgroundColor: 'green', color: '#fff' },
                        });
                    } else {
                        toast.error('Internal error while uploading file', {
                            position: toast.POSITION.TOP_RIGHT,
                            style: { backgroundColor: 'red', color: '#fff' },
                        });
                    }
                })
                .catch((error) => {
                    console.error('Error uploading file:', error);
                    toast.error('Internal error while uploading file', {
                        position: toast.POSITION.TOP_RIGHT,
                        style: { backgroundColor: 'red', color: '#fff' },
                    });
                })
                .finally(() => {
                    setSelectedFile(null);
                    setPassword('');
                    onClose();
                });
        }
    };

    const isAnyFieldEmpty = () => {
        return !selectedFile;
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
            PaperProps={{
                sx: {
                    borderRadius: 4,
                    background: "linear-gradient(120deg, #f8fafc 80%, #e3f0ff 100%)",
                    boxShadow: "0 8px 32px rgba(0,123,255,0.18)",
                    minWidth: { xs: "90vw", sm: 420 },
                    p: { xs: 1, sm: 3 }
                }
            }}
        >
            <DialogTitle
                sx={{
                    fontWeight: 900,
                    fontSize: "1.7rem",
                    color: "#007bff",
                    textAlign: "center",
                    letterSpacing: 1.2,
                    background: "linear-gradient(90deg, #e3f0ff 0%, #f8fafc 100%)",
                    borderRadius: "16px 16px 0 0",
                    mb: 1
                }}
            >
                Upload Cams and KFinTech File
            </DialogTitle>
            <DialogContent>
                <Box component="form" sx={{ mt: 1 }}>
                    <Button
                        variant="contained"
                        component="label"
                        fullWidth
                        sx={{
                            background: "linear-gradient(90deg, #007bff 0%, #00c6ff 100%)",
                            color: "#fff",
                            fontWeight: 600,
                            borderRadius: 2,
                            boxShadow: "0 2px 8px rgba(0,123,255,0.12)",
                            textTransform: "none",
                            mb: 2,
                            '&:hover': {
                                background: "linear-gradient(90deg, #0056b3 0%, #00aaff 100%)"
                            }
                        }}
                    >
                        {selectedFile ? selectedFile.name : "Select PDF File"}
                        <input
                            type="file"
                            accept=".pdf"
                            hidden
                            onChange={handleFileChange}
                        />
                    </Button>
                    <TextField
                        fullWidth
                        type={showPassword ? "text" : "password"}
                        label="Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        sx={{
                            background: "#fff",
                            borderRadius: 2,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                '& fieldset': {
                                    borderColor: '#bdbdbd',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#007bff',
                                    borderWidth: 2,
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#007bff',
                                    borderWidth: 2,
                                },
                            }
                        }}
                        InputLabelProps={{
                            style: {
                                background: "#fff",
                                padding: "0 6px",
                                fontWeight: 500,
                                fontSize: 18
                            }
                        }}
                        InputProps={{
                            style: { fontWeight: 500, fontSize: 18, borderRadius: 12, background: "#fff" },
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
                </Box>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button
                    onClick={handleCancel}
                    variant="contained"
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
                <Button
                    onClick={handleSubmit}
                    variant="contained"
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
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UploadFormDialog;