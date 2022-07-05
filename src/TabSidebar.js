import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { DataContext } from '../src/contexts/DataProvider'
import DragDrop from './hooks/DragDrop';
const undpLogo = require('../src/UNDP-Logo-Blue-Large.png')


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function TabSidebar() {
    const [value, setValue] = useState(0);
    const { gjn, setGjn } = useContext(DataContext);
    const [farmCount, setFarmCount] = useState('');
    const [cornCount, setCornCount] = useState();
    const [barleyCount, setBarleyCount] = useState();
    const [riceCount, setRiceCount] = useState();
    const [wheatCount, setWheatCount] = useState();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        if (gjn) {
            setFarmCount(gjn.length)
            const corn = gjn.filter((x) => { return x.properties.crop_type == '0' });
            const barley = gjn.filter((x) => x.properties.crop_type == "1");
            const rice = gjn.filter((x) => x.properties.crop_type == "2");
            const wheat = gjn.filter((x) => x.properties.crop_type == "3");
            console.log(corn.length);
            setCornCount(corn.length)
            setBarleyCount(barley.length)
            setRiceCount(rice.length)
            setWheatCount(wheat.length)
            console.log(gjn)
        }

    }, [gjn])
    //console.log(gjn);

    return (
        <Box display="flex" flexDirection='column' alignItems='center' sx={{ width: '30vw' }}>
            <img src={undpLogo} style={{ width: '30%' }} alt='logo' />
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Statistics" {...a11yProps(0)} />
                    <Tab label="Upload Data" {...a11yProps(1)} />
                    <Tab label="About" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Typography>Total Farms Mapped: {farmCount}</Typography>
                <Typography>Total Farms producing Corn: {cornCount}</Typography>
                <Typography>Total Farms producing Barley: {barleyCount}</Typography>
                <Typography>Total Farms producing Rice: {riceCount}</Typography>
                <Typography>Total Farms producing Wheat: {wheatCount}</Typography>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <DragDrop />
            </TabPanel>
            <TabPanel value={value} index={2}>
                This application visualizes small farms in South Africa. Farm boundaries can be editing by clicking on a farm and dragging the white nodes. Clicking a farm will also bring up more information.
            </TabPanel>
        </Box>
    );
}