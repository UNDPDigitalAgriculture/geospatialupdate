import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useMap } from "react-leaflet";
import { vividColors } from "./utils/colors";
import L from "leaflet";

const DropDown = () => {
  const [age, setAge] = React.useState("");
  const [cropFilter, setCropFilter] = React.useState('');

  const map = useMap();



  const LegendInfo = () => {

    if (cropFilter == 'all' || cropFilter == '') {
      return (
        <>
          <Box
            display='flex'
            flexDirection='row'
            width='100%'
            alignItems='center'
            justifyContent='space-between'
            height='20px'
          >
            <h4>Corn</h4>
            <div className='color-corn'></div>
          </Box>
          <Box
            display='flex'
            flexDirection='row'
            width='100%'
            alignItems='center'
            justifyContent='space-between'
            height='20px'
          >
            <h4>Wheat</h4>
            <div className='color-wheat'></div>
          </Box>
          <Box
            display='flex'
            flexDirection='row'
            width='100%'
            alignItems='center'
            justifyContent='space-between'
            height='20px'
          >
            <h4>Barley</h4>
            <div className='color-barley'></div>
          </Box>
          <Box
            display='flex'
            flexDirection='row'
            width='100%'
            alignItems='center'
            justifyContent='space-between'
            height='20px'
          >
            <h4>Rice</h4>
            <div className='color-rice'></div>
          </Box>
        </>
      )
    } else {

      return (
        <>
          <Box
            display='flex'
            flexDirection='row'
            width='100%'
            alignItems='center'
            justifyContent='space-between'
            height='20px'
          >
            <h4>Great Health</h4>
            <div className='color-greathealth'></div>
          </Box>
          <Box
            display='flex'
            flexDirection='row'
            width='100%'
            alignItems='center'
            justifyContent='space-between'
            height='20px'
          >
            <h4>Good Health</h4>
            <div className='color-goodhealth'></div>
          </Box>
          <Box
            display='flex'
            flexDirection='row'
            width='100%'
            alignItems='center'
            justifyContent='space-between'
            height='20px'
          >
            <h4>Average Health</h4>
            <div className='color-okhealth'></div>
          </Box>
          <Box
            display='flex'
            flexDirection='row'
            width='100%'
            alignItems='center'
            justifyContent='space-between'
            height='20px'
          >
            <h4>Bad Health</h4>
            <div className='color-badhealth'></div>
          </Box>
        </>
      )
    }
  }

  const handleChange = (event) => {
    setAge(event.target.value);
    if (event.target.value === "Patensie") {
      map.flyTo([-33.78, 24.83], 14);
    } else if (event.target.value === "Other") {
      map.flyTo([-34.121, 20.617], 14);
    } else {
      map.flyTo([-34.117, 20.921], 14);
    }
  };

  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setCropFilter(event.target.value);
    const val = event.target.value;
    //console.log(event.target.value);
    map.eachLayer((layer) => {
      if (layer.feature) {
        if (val === "all") {
          layer.setStyle({
            color:
              layer.feature["properties"].crop_type === "0"
                ? vividColors[0]
                : layer.feature["properties"].crop_type === "1"
                  ? vividColors[1]
                  : layer.feature["properties"].crop_type === "2"
                    ? vividColors[2]
                    : vividColors[3],
            fillColor:
              layer.feature["properties"].crop_type === "0"
                ? vividColors[0]
                : layer.feature["properties"].crop_type === "1"
                  ? vividColors[1]
                  : layer.feature["properties"].crop_type === "2"
                    ? vividColors[2]
                    : vividColors[3],
          });
        } else {
          //console.log(layer.feature["properties"][val]);
          layer.setStyle({
            fillColor:
              layer.feature["properties"][val] >= 40
                ? "#1a9641"
                : layer.feature["properties"][val] < 40 &&
                  layer.feature["properties"][val] >= 30
                  ? "#a6d96a"
                  : layer.feature["properties"][val] < 30 &&
                    layer.feature["properties"][val] >= 10
                    ? "#fdae61"
                    : "red",
            color:
              layer.feature["properties"][val] >= 40
                ? "#1a9641"
                : layer.feature["properties"][val] < 40 &&
                  layer.feature["properties"][val] >= 30
                  ? "#a6d96a"
                  : layer.feature["properties"][val] < 30 &&
                    layer.feature["properties"][val] >= 10
                    ? "#fdae61"
                    : "red",
          });
        }
      }
      //console.log(layer.feature["properties"]);
      //if(lay)
    });
    // var lg = L.layerGroup();
    // lg.addTo(map);
    // map.eachLayer(function (layer) {
    //   console.log(layer);
    //   //   if (layer.feature.properties.crop_type === event.target.value) {
    //   //     lg.push(layer.feature);
    //   //   }
    // });
  };

  return (
    <>
      <div className="leaflet-top leaflet-left">
        <div
          style={{
            //   width: "100px",
            //   height: "50px",
            padding: "10px",
            backgroundColor: "whitesmoke",
            position: "relative",
          }}
          className="leaflet-control leaflet-bar">
          <Box sx={{ minWidth: 130 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Locations</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleChange}>
                <MenuItem value={"Patensie"}>Patensie</MenuItem>
                <MenuItem value={"Other"}>Suurbraak</MenuItem>
                <MenuItem value={30}>Heidelberg</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ mt: 2, minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Farm Health</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={cropFilter}
                label="Health"
                onChange={handleFilterChange}>
                <MenuItem value={"all"}>All</MenuItem>
                <MenuItem value={"2017"}>2017</MenuItem>
                <MenuItem value={"2018"}>2018</MenuItem>
                <MenuItem value={"2019"}>2019</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
      </div>
      <div className="leaflet-bottom leaflet-left">
        <div
          style={{
            width: "120px",
            // height: "50px",
            padding: "10px",
            backgroundColor: "whitesmoke",
            position: "relative",
            fontFamily: 'Helvetica'
          }}
          className="leaflet-control leaflet-bar">
          {/* <h4>Legend</h4> */}
          <LegendInfo />

        </div>
      </div>
    </>
  );
};

export default DropDown;
