import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar, gridClasses } from "@mui/x-data-grid";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import RefreshIcon from "@mui/icons-material/Refresh";
import DialogActions from "@mui/material/DialogActions";
import axios from "axios";
import { COMMON_URL } from "../constants/URL";
import { Box, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select, Typography, useTheme, IconButton, Tooltip, Paper } from "@mui/material";
import { useCookies } from "react-cookie";
import Loading from "../main/Loading";
import { useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

const ManageMutualFund = () => {
    const [data, setData] = useState([]);
    const [cookies] = useCookies(['access_token']);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [dialogMode, setDialogMode] = useState("add"); // "add" or "edit"
    const [selectedRow, setSelectedRow] = useState(null);
    const [schemeName, setSchemeName] = useState('');
    const [schemeCode, setSchemeCode] = useState('');
    const [id, setId] = useState(null);
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const userData = useSelector(state => state.login);
    const theme = useTheme();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [rowToDelete, setRowToDelete] = useState(null);
    const [addError, setAddError] = useState("");
    const [schemeDetails, setSchemeDetails] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                axios.defaults.headers.common['Authorization'] = cookies['access_token'];
                const dbData = await axios.get(COMMON_URL + "app/get-mutualfunds");
                if (dbData.status === 200 && dbData.data) {
                    setData(dbData.data);
                }
            }
            catch (error) {
                console.error('Error calling one or more APIs', error);
            }
            setIsLoading(false);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (!search) {
            setFilteredData(data);
        } else {
            setFilteredData(
                data.filter(row =>
                    row.schemeName?.toLowerCase().includes(search.toLowerCase()) ||
                    row.schemeCode?.toString().includes(search) ||
                    row.amcName?.toLowerCase().includes(search.toLowerCase())
                )
            );
        }
    }, [search, data]);

    const columns = [
        {
            field: "amcName",
            headerName: "AMC Name",
            flex: 1,
            minWidth: 120,
            renderCell: (params) => (
                <Box sx={{ whiteSpace: 'normal', wordBreak: 'break-word', lineHeight: 1.3 }}>
                    {params.value}
                </Box>
            ),
        },
        {
            field: "schemeName",
            headerName: "Scheme Name",
            flex: 1.5,
            minWidth: 800,
            renderCell: (params) => (
                <Box sx={{ whiteSpace: 'normal', wordBreak: 'break-word', lineHeight: 1.3 }}>
                    {params.value}
                </Box>
            ),
        },
        {
            field: "option",
            headerName: "Option",
            flex: 1,
            minWidth: 200,
            renderCell: (params) => (
                <Box sx={{ whiteSpace: 'normal', wordBreak: 'break-word', lineHeight: 1.3 }}>
                    {params.value}
                </Box>
            ),
        },
        {
            field: "planType",
            headerName: "Plan Type",
            flex: 1,
            maxWidth: 200,
            renderCell: (params) => (
                <Box sx={{ whiteSpace: 'normal', wordBreak: 'break-word', lineHeight: 1.3 }}>
                    {params.value}
                </Box>
            ),
        },
        {
            field: "schemeCode",
            headerName: "Scheme Code",
            flex: 1,
            maxWidth: 200,
            renderCell: (params) => (
                <Box sx={{ whiteSpace: 'normal', wordBreak: 'break-word', lineHeight: 1.3 }}>
                    {params.value}
                </Box>
            ),
        },
        // {
        //     field: "actions",
        //     headerName: "Actions",
        //     flex: 1,
        //     minWidth: 120,
        //     sortable: false,
        //     filterable: false,
        //     renderCell: (params) => (
        //         <Box>
        //             <Tooltip title="Edit">
        //                 <IconButton
        //                     color="primary"
        //                     onClick={() => handleEdit(params.row)}
        //                     sx={{ mr: 1 }}
        //                 >
        //                     <EditIcon />
        //                 </IconButton>
        //             </Tooltip>
        //             <Tooltip title="Delete">
        //                 <IconButton
        //                     color="error"
        //                     onClick={() => handleDelete(params.row)}
        //                 >
        //                     <DeleteIcon />
        //                 </IconButton>
        //             </Tooltip>
        //         </Box>
        //     ),
        // },
    ];

    const handleDialog = (mode = "add") => {
        setDialogMode(mode);
        setDialogOpen(!isDialogOpen);
        setSchemeCode('');
        setId(null);
        setAddError("");
        setSchemeDetails(null);
    };

    const isAnyFieldEmpty = () => {
        return !schemeCode;
    };

    const handleAddOrEdit = async () => {
        setAddError("");
        setSchemeDetails(null);
        if (!schemeCode) {
            setAddError("Scheme code is required.");
            return;
        }
        // First check in frontend state
        const alreadyExists = data.some(item => String(item.schemeCode) === String(schemeCode));
        if (alreadyExists) {
            setAddError("This scheme code already exists in your database.");
            return;
        }
        setIsLoading(true);
        try {
            axios.defaults.headers.common['Authorization'] = cookies['access_token'];
            // Check with backend as well
            const existsRes = await axios.get(COMMON_URL + `app/exists-mutualfund/${schemeCode}`);
            if (existsRes.data === true) {
                setAddError("This scheme code already exists in your database.");
                setIsLoading(false);
                return;
            }
            // Call backend to get scheme details by code
            const res = await axios.get(COMMON_URL + `app/get-mutualfund-details/${schemeCode}`);
            if (res.status === 200 && res.data) {
                setSchemeDetails(res.data);
                // Now add to DB
                await axios.post(COMMON_URL + "app/save-mutualfund", res.data);
                // Refresh data
                const dbData = await axios.get(COMMON_URL + "app/get-mutualfunds");
                if (dbData.status === 200 && dbData.data) {
                    setData(dbData.data);
                }
                setDialogOpen(false);
            } else {
                setAddError("Scheme details not found for this code.");
            }
        } catch (error) {
            setAddError("Failed to fetch or save scheme details.");
        } finally {
            setIsLoading(false);
            setSchemeCode('');
        }
    };

    const handleEdit = (row) => {
        setSchemeName(row.schemeName);
        setSchemeCode(row.schemeCode);
        setId(row.id);
        setDialogMode("edit");
        setDialogOpen(true);
    };

    const handleDelete = (row) => {
        setRowToDelete(row);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        setIsLoading(true);
        setDeleteDialogOpen(false);
        axios.defaults.headers.common['Authorization'] = cookies['access_token'];
        try {
            // await axios.delete(`${COMMON_URL}app/delete-mutualfund/${rowToDelete.id}`);
            // setData(prev => prev.filter(item => item.id !== rowToDelete.id));
            throw new Error("Delete API not implemented yet");
        } catch (error) {
            console.error('Delete failed:', error);
        }
        setIsLoading(false);
        setRowToDelete(null);
    };

    const handleRowSelection = (ids) => {
        const selected = data.find(row => row.id === ids[0]);
        setSelectedRow(selected || null);
    };

    const hasAdmin = () => {
        return userData && userData.authorities && userData.authorities[0].authority === "admin";
    };

    const handleRefresh = async () => {
        setIsLoading(true);
        try {
            axios.defaults.headers.common['Authorization'] = cookies['access_token'];
            const dbData = await axios.get(COMMON_URL + "app/get-mutualfunds");
            if (dbData.status === 200 && dbData.data) {
                setData(dbData.data);
            }
        } catch (error) {
            console.error('Error refreshing data', error);
        }
        setIsLoading(false);
    };

    return (
        <Box 
        // sx={{
        //     width: "100%",
        //     padding: 2,
        //     background: "linear-gradient(120deg, #f8fafc 80%, #e3f0ff 100%)",
        //     minHeight: "100vh"
        // }}
        >
            <Paper elevation={3} sx={{
                p: { xs: 2, sm: 4 },
                m: { xs: 1, sm: 4 },
                borderRadius: 4,
                boxShadow: "0 8px 32px rgba(0,123,255,0.10)",
                background: " #ffffff",
                padding: 2,
            }}>
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3
                }}>
                    <Typography variant="h4" fontWeight={900} color=" #007bff">
                        Manage Mutual Funds
                    </Typography>
                    <IconButton
                        aria-label="refresh"
                        onClick={handleRefresh}
                        sx={{
                            background: "linear-gradient(90deg, #007bff 0%, #00c6ff 100%)",
                            color: "#fff",
                            ml: 2,
                            '&:hover': {
                                background: 'linear-gradient(90deg,rgb(255, 145, 0) 0%,rgb(255, 212, 119) 100%) !important',
                                color: ' #ffffff !important',
                                boxShadow: '0 4px 16px rgba(0,123,255,0.18)',
                            }
                        }}
                    >
                        <RefreshIcon />
                    </IconButton>
                    {/* <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => handleDialog("add")}
                        sx={{
                            background: "linear-gradient(90deg, #007bff 0%, #00c6ff 100%)",
                            color: " #ffffff",
                            fontWeight: 700,
                            borderRadius: 2,
                            px: 3,
                            py: 1,
                            boxShadow: "0 2px 8px rgba(0,123,255,0.12)",
                            textTransform: "none",
                            '&:hover': {
                                background: "linear-gradient(90deg, #0056b3 0%, #00aaff 100%)"
                            }
                        }}
                    >
                        Add Fund
                    </Button> */}
                </Box>
                <Box sx={{
                    mb: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 2
                }}>
                    <SearchIcon sx={{ color: " #007bff", fontSize: 28 }} />
                    <OutlinedInput
                        placeholder="Search by AMC, Scheme Name or Code"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        sx={{
                            width: 350,
                            background: " #f8fafc",
                            borderRadius: 2,
                            fontSize: 18,
                            fontWeight: 500,
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#bdbdbd',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#007bff',
                                borderWidth: 2,
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#007bff',
                                borderWidth: 2,
                            },
                        }}
                        startAdornment={<></>}
                    />
                </Box>
                {isLoading ? (
                    <Loading />
                ) : (
                    <Box sx={{
                        width: "100%",
                        '& .MuiDataGrid-root': {
                            background: " #ffffff",
                            borderRadius: 2,
                        },
                        '& .MuiDataGrid-columnHeaders': {
                            background: "linear-gradient(90deg, #e3f0ff 0%, #f8fafc 100%)",
                            color: " #007bff",
                            fontWeight: 700,
                            fontSize: 18,
                        },
                        '& .MuiDataGrid-row': {
                            fontSize: 16,
                        },
                        '& .MuiDataGrid-footerContainer': {
                            background: " #f8fafc",
                        },
                        '& .MuiDataGrid-toolbarContainer': {
                            background: " #f8fafc",
                            color: "#007bff", // Make toolbar controls more visible
                            fontWeight: 700,
                            fontSize: 16,
                            minHeight: 48,
                            '& .MuiButton-root, & .MuiInputBase-root, & .MuiSvgIcon-root': {
                                color: " #007bff !important", // Buttons, icons, and inputs in toolbar
                                fontWeight: 700,
                            },
                            '& .MuiInputBase-input': {
                                color: " #222222 !important",
                                fontWeight: 600,
                            },
                            '& .MuiSvgIcon-root': {
                                fontSize: 24,
                            },
                        }
                    }}>
                        <DataGrid
                            autoHeight
                            rows={filteredData}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[5, 10, 20]}
                            getRowId={row => row.id}
                            components={{
                                Toolbar: GridToolbar,
                                NoRowsOverlay: () => (
                                    <Box sx={{ p: 4, textAlign: "center", color: " #888" }}>
                                        No mutual funds found.
                                    </Box>
                                ),
                            }}
                            sx={{
                                border: "none",
                                fontFamily: theme.typography.fontFamily,
                                [`& .${gridClasses.cell}`]: {
                                    borderBottom: "1px solid #e3f0ff"
                                }
                            }}
                            onRowSelectionModelChange={handleRowSelection}
                            disableColumnMenu={false}
                            disableColumnFilter={false}
                            disableColumnSelector={false}
                            columnBuffer={8}
                            columnThreshold={8}
                            resizable
                            experimentalFeatures={{ columnResize: true }}
                        />
                    </Box>
                )}
            </Paper>
            <Dialog open={isDialogOpen} onClose={() => setDialogOpen(false)} maxWidth="xs" fullWidth>
                <DialogTitle sx={{
                    fontWeight: 700,
                    color: " #007bff",
                    background: "linear-gradient(90deg, #e3f0ff 0%, #f8fafc 100%)"
                }}>
                    Add Mutual Fund
                    <IconButton
                        aria-label="close"
                        onClick={() => setDialogOpen(false)}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: " #888888"
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
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
                                            color: " #007bff",
                                            fontWeight: 600,
                                            zIndex: 2,
                                            '&.Mui-focused': {
                                                color: " #007bff",
                                                background: " #ffffff",
                                            },
                                            '&.MuiInputLabel-shrink': {
                                                background: " #ffffff",
                                            }
                                        }}
                                    >
                                        Scheme Code
                                    </InputLabel>
                                    <OutlinedInput
                                        label="Scheme Code"
                                        type="number"
                                        value={schemeCode}
                                        onChange={e => setSchemeCode(e.target.value)}
                                        sx={{
                                            background: " #ffffff",
                                            borderRadius: 2,
                                            fontWeight: 600,
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
                            {addError && (
                                <Grid item xs={12}>
                                    <Typography color="error" fontWeight={600}>{addError}</Typography>
                                </Grid>
                            )}
                            {schemeDetails && (
                                <Grid item xs={12}>
                                    <Typography color="primary" fontWeight={600}>
                                        {schemeDetails.schemeName} ({schemeDetails.schemeCode})<br />
                                        {schemeDetails.amcName}
                                    </Typography>
                                </Grid>
                            )}
                            <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                                <Button
                                    variant="contained"
                                    onClick={handleAddOrEdit}
                                    disabled={isAnyFieldEmpty()}
                                    sx={{
                                        background: "linear-gradient(90deg, #007bff 0%, #00c6ff 100%)",
                                        color: " #ffffff",
                                        fontWeight: 700,
                                        fontSize: "1.1rem",
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
                                    Add
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => setDialogOpen(false)}
                                    sx={{
                                        background: "linear-gradient(90deg, #e53935 0%, #ffb199 100%)",
                                        color: " #ffffff",
                                        fontWeight: 700,
                                        fontSize: "1.1rem",
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
                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default ManageMutualFund;