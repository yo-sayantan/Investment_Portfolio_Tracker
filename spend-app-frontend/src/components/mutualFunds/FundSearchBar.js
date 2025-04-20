import React, { useState } from 'react';
import { AppBar, Toolbar, Button, InputAdornment, TextField, Grid, Tooltip, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import AddIcon from '@mui/icons-material/Add';
import UploadIcon from '@mui/icons-material/Upload';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import InsightsIcon from '@mui/icons-material/Insights';
import AddItemDialog from './AddItemDialog';
import UploadFormDialog from './UploadFormDialog';
import ProfileAnalysis from './ProfileAnalysis';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        margin: '6px',
    },
    appBar: {
        boxShadow: 'none !important',
        backgroundColor: 'transparent !important',
        color: ' #333333 !important',
    },
    searchPaper: {
        display: 'flex',
        alignItems: 'center',
        padding: '8px 15px',
        borderRadius: 200,
        background: 'linear-gradient(90deg,rgb(177, 210, 248) 0%, #f8fafc 100%)',
        boxShadow: '0 4px 16px rgba(0,123,255,0.08)',
        border: '2px solid #007bff',
        transition: 'box-shadow 0.2s, border-color 0.2s',
        '&:focus-within': {
            boxShadow: '0 8px 32px rgba(0,123,255,0.15)',
            borderColor: ' #0056b3',
        },
        minHeight: 50,
    },
    searchInput: {
        flex: 1,
        border: 'none',
        background: 'transparent',
        fontSize: 22,
        padding: '12px 0',
        outline: 'none',
        color: ' #222222',
        fontWeight: 400,
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '18px',
    },
    button: {
        background: 'linear-gradient(90deg, #007bff 0%, #00c6ff 100%) !important',
        color: ' #ffffff !important',
        border: 'none !important',
        borderRadius: 8,
        boxShadow: '0 2px 8px rgba(0,123,255,0.12)',
        transition: 'background 0.2s, color 0.2s, box-shadow 0.2s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        '&:hover': {
            background: 'linear-gradient(90deg,rgb(255, 145, 0) 0%,rgb(255, 212, 119) 100%) !important',
            color: ' #ffffff !important',
            boxShadow: '0 4px 16px rgba(0,123,255,0.18)',
        },
    },
    icon: {
        fontSize: '2.5rem !important',
        color: 'rgb(255, 255, 255)',
        padding: 0,
        transition: 'background 0.2s, color 0.2s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconActive: {
        fontSize: '3rem !important',
        borderRadius: 2,
        background: ' #007bff',
        color: ' #ffffff',
        boxShadow: '0 4px 16px rgba(0,123,255,0.18)',
        padding: 0,
        margin: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
                                <SearchIcon className={classes.icon} style={{ marginRight: 20, opacity: 0.9 }} />
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
                                        <InsightsIcon className={classes.icon} />
                                    </Button>
                                </Tooltip>
                                <Tooltip title="Add">
                                    <Button variant="outlined" onClick={handleAddClick} className={classes.button}>
                                        <AddIcon className={classes.icon} />
                                    </Button>
                                </Tooltip>
                                <Tooltip title="Bulk Upload">
                                    <Button variant="outlined" onClick={handleUploadClick} className={classes.button}>
                                        <UploadIcon className={classes.icon} />
                                    </Button>
                                </Tooltip>
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