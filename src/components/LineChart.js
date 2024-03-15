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
        pointBorderColor: "#b182e3",
        pointBorderWidth: 3,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "#b182e3");
          gradient.addColorStop(1, "white");
          return gradient;
        },
      },
    ],
  };

  const options = {
    plugins: {
      legend: true,
    },
    responsive: true,
    scales: {
      y: {
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

  return <Line data={data} options={options}></Line>;
}

export default LineChart;
