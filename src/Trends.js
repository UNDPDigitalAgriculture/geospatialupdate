import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import LineChart from "./lineChart";
import { ScatterChart } from "./Scatter";
import HBarChart from "./hBarChart";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Trends = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div
      style={{
        top: "0px",
        left: "30vw",
        height: "100vh",
        width: "70vw",
        position: "absolute",
      }}>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example">
            <Tab label="Fall Yields" {...a11yProps(0)} />
            <Tab label="Spring Yields" {...a11yProps(1)} />
            <Tab label="Yield by Season" {...a11yProps(2)} />
            <Tab label="Statistics" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <div class="grid2x2">
            <div class="box box1">
              <div>
                <LineChart label="Corn" />
              </div>
            </div>
            <div class="box box2">
              <div>
                <LineChart label="Barley" />
              </div>
            </div>
            <div class="box box3">
              <div>
                <LineChart label="Rice" />
              </div>
            </div>
            <div class="box box4">
              <div>
                <LineChart label="Wheat" />
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div class="grid2x2">
            <div class="box box1">
              <div>
                <LineChart label="Corn" />
              </div>
            </div>
            <div class="box box2">
              <div>
                <LineChart label="Barley" />
              </div>
            </div>
            <div class="box box3">
              <div>
                <LineChart label="Rice" />
              </div>
            </div>
            <div class="box box4">
              <div>
                <LineChart label="Wheat" />
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <div class="grid2x2">
            <div class="box box1">
              <div>
                <HBarChart label="Corn" />
              </div>
            </div>
            <div class="box box2">
              <div>
                <HBarChart label="Barley" />
              </div>
            </div>
            <div class="box box3">
              <div>
                <HBarChart label="Rice" />
              </div>
            </div>
            <div class="box box4">
              <div>
                <HBarChart label="Wheat" />
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <div class="grid2x2">
            <div class="box box1">
              <div>
                <HBarChart label="Corn" />
              </div>
            </div>
            <div class="box box2">
              <div>
                <HBarChart label="Barley" />
              </div>
            </div>
            <div class="box box3">
              <div>
                <HBarChart label="Rice" />
              </div>
            </div>
            <div class="box box4">
              <div>
                <HBarChart label="Wheat" />
              </div>
            </div>
          </div>
        </TabPanel>
      </Box>
    </div>
  );
};

export default Trends;
