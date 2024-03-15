"use client"

import { Line } from "react-chartjs-2"

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, // x axis
  LinearScale, // y axis
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

const salesData = [
  { month: "January", sales: 100 },
  { month: "February", sales: 150 },
  { month: "March", sales: 200 },
  { month: "April", sales: 120 },
  { month: "May", sales: 180 },
  { month: "June", sales: 250 },
];

function LineChart() {
  const data = {
    labels: salesData.map((data) => data.month),
    datasets: [
      {
        label: "Kurva Bezier",
        data: salesData.map((data) => data.sales),
        borderColor: "#b182e3",
        pointBorderColor: "#b182e3",
        pointBorderWidth: 3,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "white");
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
        min: 50,
      },
      x: {
        ticks: {
          font: {
            size: 14,
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
            size: 14,
            style: "",
            family: "Arial",
          },
        },
      },
    },
  };

  return (
    <Line data={data} options={options}></Line>
  );
}

export default LineChart;