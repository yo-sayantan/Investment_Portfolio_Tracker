import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import { Box, Dialog, DialogContent } from '@mui/material';
import InvestMentChart from './InvesmentChart';
import FundPieChart from './PieChart';
import { TabContext, TabList } from '@mui/lab';

const ProfileAnalysis = (props) => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
            fullWidth
            maxWidth="lg"
            PaperProps={{
                style: {
                    width: "70%",
                    height: "90%",
                    maxHeight: "none",
                },
            }}
        >
            <DialogContent>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: ' #ffffff' }}>
                        <TabList
                            onChange={handleChange}
                            aria-label="Investment tab"
                            TabIndicatorProps={{ style: { background: ' #007bff' } }}
                            textColor="primary"
                        >
                            <Tab label="Investment Analysis Chart" value="1" style={{ color: ' #007bff', fontWeight: 600 }} />
                            <Tab label="Pie Analysis Chart" value="2" style={{ color: ' #007bff', fontWeight: 600 }} />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <InvestMentChart />
                    </TabPanel>
                    <TabPanel value="2">
                        <FundPieChart />
                    </TabPanel>
                </TabContext>
            </DialogContent>
        </Dialog>
    );
};

export default ProfileAnalysis;