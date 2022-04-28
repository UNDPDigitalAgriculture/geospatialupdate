import { useEffect, useState, useRef, useContext } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import LineChart from "./lineChart";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import area from "@turf/area";
import { polygon } from "@turf/helpers";
import { useMap } from "react-leaflet";
import { faker } from "@faker-js/faker";
import { Doughnut } from "react-chartjs-2";
import { vividColors } from "./utils/colors";

import {
  getDatabase,
  ref,
  onValue,
  set,
  setValue,
  child,
  push,
  update,
} from "firebase/database";
ChartJS.register(ArcElement, Tooltip, Legend);
const Sidebar = (props) => {
  const [stats, setStats] = useState();
  const [totalArea, setTotalArea] = useState();
  const [cornCount, setCornCount] = useState();
  const [barleyCount, setBarleyCount] = useState();
  const [riceCount, setRiceCount] = useState();
  const [wheatCount, setWheatCount] = useState();
  const [pieData, setPieData] = useState();
  const [farmCount, setFarmCount] = useState();
  const pieRef = useRef();

  const callDb = () => {
    const database = getDatabase();
    const dbref = ref(database, "/features/");
    onValue(dbref, (snapshot) => {
      const data = snapshot.val();
      //console.log(data);
      const corn1 = data.filter((x) => x.properties.crop_type == "0");
      const barley1 = data.filter((x) => x.properties.crop_type == "1");
      const rice1 = data.filter((x) => x.properties.crop_type == "2");
      const wheat1 = data.filter((x) => x.properties.crop_type == "3");
      //console.log(corn1);
      //console.log(corn1.filter((x) => x === true));
      setCornCount(corn1);
      setBarleyCount(barley1);
      setRiceCount(rice1);
      setWheatCount(wheat1);
      //setStats(data);
      setFarmCount(data.length);

      const prepPie = {
        labels: ["corn", "barley", "rice", "wheat"],
        datasets: [
          {
            label: "# of Votes",
            data: [corn1.length, barley1.length, rice1.length, wheat1.length],
            backgroundColor: [
              vividColors[0],
              vividColors[1],
              vividColors[2],
              vividColors[3],
            ],
            borderColor: [
              vividColors[0],
              vividColors[1],
              vividColors[2],
              vividColors[3],
            ],
            borderWidth: 1,
          },
        ],
      };
      //console.log(prepPie.data);
      setPieData(prepPie);
    });
  };

  useEffect(() => {
    callDb();
  }, []);

  return (
    <div className="sidebar">
      <h1 style={{ top: "10px", margin: 0, padding: 0, marginBottom: 1 }}>
        UNDP Digital Agriculture
      </h1>
      <Box
        sx={{
          mt: 4,
          mb: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}>
        <Button variant="contained" href="#section1">
          Explore
        </Button>
        <Button variant="contained" href="#section2">
          Compare
        </Button>
        <Button variant="contained" href="#section3">
          Data Trends
        </Button>
      </Box>

      {pieData ? (
        <Box
          sx={{
            height: "60%",
            width: "60%",
            ml: 11,
          }}>
          <Doughnut
            width={80}
            height={50}
            ref={pieRef}
            options={{
              //   //maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: true,
                  position: "bottom",
                  //onClick: handleClick
                },
              },
            }}
            data={pieData}
          />
        </Box>
      ) : (
        <div> </div>
      )}
      <Box>Total Number of Farms Mapped: {farmCount}</Box>
    </div>
  );
};

export default Sidebar;
