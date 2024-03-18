import React from "react";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler
);

function LineChart({ coordinates }) {
  const data = {
    labels: coordinates.map((coord) => coord.x),
    datasets: [
      {
        label: "Kurva Bezier",
        data: coordinates.map((coord) => coord.y),
        borderColor: "#b182e3",
        borderWidth: 3,
        pointBorderColor: "#b182e3",
        pointBorderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: true,
      type: "line",
    },
    responsive: true,
    scales: {
      y: {
        type: "linear",
        ticks: {
          font: {
            size: 14,
            weight: "bold",
          },
        },
        title: {
          display: true,
          text: "Y",
          padding: {
            bottom: 10,
          },
          font: {
            size: 14,
            style: "",
            family: "Arial",
          },
        },
        min: 0,
      },
      x: {
        type: "linear",
        ticks: {
          font: {
            size: 12,
            weight: "bold",
          },
        },
        title: {
          display: true,
          text: "X",
          padding: {
            top: 10,
          },
          font: {
            size: 12,
            style: "",
            family: "Arial",
          },
        },
      },
    },
  };

  return <Line data={data} height={500} width={700} options={options}></Line>;
}

export default LineChart;
