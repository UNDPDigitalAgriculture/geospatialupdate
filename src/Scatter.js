import React from "react";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

export const data = {
  datasets: [
    {
      label: "A dataset",
      data: Array.from({ length: 600 }, () => ({
        x: [2015, 2016, 2017],
        y: faker.datatype.number({ min: 0, max: 50 }),
      })),
      backgroundColor: "rgba(255, 99, 132, 1)",
    },
  ],
};

export function ScatterChart() {
  return <Scatter options={options} data={data} />;
}
