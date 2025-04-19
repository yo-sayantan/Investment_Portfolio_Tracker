import React, { useState } from 'react';
import { AppBar, Toolbar, Button, InputAdornment, TextField, Grid, Tooltip, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import AddIcon from '@mui/icons-material/Add';
import UploadIcon from '@mui/icons-material/Upload';
import SearchIcon from '@mui/icons-material/Search';
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
        padding: '2px 12px',
        borderRadius: 30,
        background: '#fff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        border: '1px solid #e0e0e0',
        transition: 'box-shadow 0.2s',
        '&:focus-within': {
            boxShadow: '0 4px 16px rgba(0,123,255,0.10)',
            borderColor: '#007bff',
        },
    },
    searchInput: {
        flex: 1,
        border: 'none',
        background: 'transparent',
        fontSize: 18,
        padding: '8px 0',
        outline: 'none',
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '12px',
    },
    button: {
        backgroundColor: '#fff !important',
        color: '#007bff !important',
        border: '1px solid #007bff !important',
        borderRadius: 24,
        minWidth: 40,
        minHeight: 40,
        boxShadow: '0 1px 4px rgba(0,123,255,0.08)',
        transition: 'background 0.2s, color 0.2s',
        '&:hover': {
            backgroundColor: '#007bff !important',
            color: '#fff !important',
        },
    },
    icon: {
        fontSize: 22,
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

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar} elevation={0}>
                <Toolbar disableGutters>
                    <Grid container alignItems="center" spacing={2}>
                        <Grid item xs={12} md={7}>
                            <Paper elevation={0} className={classes.searchPaper}>
                                <SearchIcon color="primary" style={{ marginRight: 8, opacity: 0.7 }} />
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