import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

const HBarChart = (props) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: props.label + " Yield by Season",
      },
    },
  };

  const labels = ["2015", "2016", "2017", "2018", "2019", "2020", "2021"];

  const data = {
    labels,
    datasets: [
      {
        label: "Fall",
        data: labels.map(() => faker.datatype.number({ min: -10, max: 20 })),
        borderColor: "rgb(255,127,80)",
        backgroundColor: "rgba(255,127,80, 0.5)",
      },
      {
        label: "Spring",
        data: labels.map(() => faker.datatype.number({ min: -10, max: 20 })),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default HBarChart;
