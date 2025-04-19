import React, { useState } from 'react';
import { AppBar, Toolbar, Button, InputAdornment, TextField, Grid, Tooltip, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import AddIcon from '@mui/icons-material/Add';
import UploadIcon from '@mui/icons-material/Upload';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddItemDialog from './AddItemDialog';
import UploadFormDialog from './UploadFormDialog';
import PieChartIcon from "@mui/icons-material/PieChart";
import ProfileAnalysis from './ProfileAnalysis';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        marginBottom: '16px',
    },
    appBar: {
        boxShadow: 'none !important',
        marginTop: '16px',
        backgroundColor: 'transparent !important',
        color: '#333 !important',
    },
    searchPaper: {
        display: 'flex',
        alignItems: 'center',
        padding: '8px 24px',
        borderRadius: 40,
        background: 'linear-gradient(90deg, #e3f0ff 0%, #f8fafc 100%)',
        boxShadow: '0 4px 16px rgba(0,123,255,0.08)',
        border: '2px solid #007bff',
        transition: 'box-shadow 0.2s, border-color 0.2s',
        '&:focus-within': {
            boxShadow: '0 8px 32px rgba(0,123,255,0.15)',
            borderColor: '#0056b3',
        },
        minHeight: 60,
    },
    searchInput: {
        flex: 1,
        border: 'none',
        background: 'transparent',
        fontSize: 22,
        padding: '12px 0',
        outline: 'none',
        color: '#222',
        fontWeight: 600,
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '18px',
    },
    button: {
        background: 'linear-gradient(90deg, #007bff 0%, #00c6ff 100%) !important',
        color: '#fff !important',
        border: 'none !important',
        borderRadius: 32,
        minWidth: 56,
        minHeight: 56,
        fontSize: 24,
        fontWeight: 700,
        boxShadow: '0 2px 8px rgba(0,123,255,0.12)',
        transition: 'background 0.2s, color 0.2s, box-shadow 0.2s',
        '&:hover': {
            background: 'linear-gradient(90deg, #0056b3 0%, #00aaff 100%) !important',
            color: '#fff !important',
            boxShadow: '0 4px 16px rgba(0,123,255,0.18)',
        },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        fontSize: 52,
    }
});

const FundSearchBar = (props) => {
    const classes = useStyles();
    const [openAddForm, setOpenAddForm] = useState(false);
    const [openUploadForm, setOpenUploadForm] = useState(false);
    const [openAnalysis, setOpenAnalysis] = useState(false);

    const handleAddClick = () => {
        setOpenAddForm(true);
    };

    const handleClose = () => {
        setOpenAddForm(false);
    };

    const handleUploadClick = () => {
        setOpenUploadForm(true);
    };

    const handleUploadClose = () => {
        setOpenUploadForm(false);
    };

    const handleAnalysisClick = () => {
        setOpenAnalysis(true);
    };

    const handleAnalysisClose = () => {
        setOpenAnalysis(false);
    };

    const handleRefresh = () => {
        if (props.updateData) {
            props.setAddLoader && props.setAddLoader(true);
            props.updateData();
        }
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar} elevation={0}>
                <Toolbar disableGutters>
                    <Grid container alignItems="center" spacing={2}>
                        <Grid item xs={12} md={7}>
                            <Paper elevation={0} className={classes.searchPaper}>
                                <SearchIcon color="primary" style={{ marginRight: 16, fontSize: 32, opacity: 0.8 }} />
                                <input
                                    className={classes.searchInput}
                                    type="text"
                                    placeholder="Search mutual funds…"
                                    value={props.searchTerm || ""}
                                    onChange={e => props.setSearchTerm && props.setSearchTerm(e.target.value)}
                                    aria-label="Search mutual funds"
                                />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <div className={classes.buttonGroup}>
                                <Tooltip title="Refresh Table">
                                    <Button
                                        variant="outlined"
                                        className={classes.button}
                                        onClick={handleRefresh}
                                    >
                                        <RefreshIcon className={classes.icon} />
                                    </Button>
                                </Tooltip>
                                <Tooltip title="Profile Analysis">
                                    <Button variant="outlined" className={classes.button} onClick={handleAnalysisClick}>
                                        <PieChartIcon className={classes.icon} />
                                    </Button>
                                </Tooltip>
                                <Tooltip title="Add">
                                    <Button variant="outlined" onClick={handleAddClick} className={classes.button}>
                                        <AddIcon className={classes.icon} />
                                    </Button>
                                </Tooltip>
                                {/* <Tooltip title="Bulk Upload">
                                    <Button variant="outlined" onClick={handleUploadClick} className={classes.button}>
                                        <UploadIcon className={classes.icon} />
                                    </Button>
                                </Tooltip> */}
                            </div>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>

            <ProfileAnalysis open={openAnalysis} onClose={handleAnalysisClose} />

            <AddItemDialog open={openAddForm} onClose={handleClose} mutualFundData={props.mutualFundData}
                updateData={props.updateData} setAddLoader={props.setAddLoader} itemType="Add" />

            <UploadFormDialog open={openUploadForm} onClose={handleUploadClose} />
        </div>
    );
};

export default FundSearchBar;