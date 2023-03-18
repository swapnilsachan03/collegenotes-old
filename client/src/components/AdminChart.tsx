import React from 'react';
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ArcElement,
  Legend } 
from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ArcElement,
  Legend
);

export const LineChart = () => {
  const labels = getMonthsInOrder();

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as "bottom",
      },
      title: {
        display: true,
        text: "Monthly Views"
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Views in Thousands",
        data: [1, 5, 3, 4, 5, 3.5, 4, 3, 6, 6.2, 6.7, 7],
        borderColor: "#00B5D8",
        backgroundColor: "#00B5D8"
      }
    ]
  };

  return <Line options={options} data={data} />;
}

export const DoughnutChart = () => {
  const data = {
    labels: ["Subscribed", "Not Subscribed"],
    datasets: [
      {
        label: "Views",
        data: [17, 30],
        borderColor: ["rgb(61, 12, 171)", "rgb(214, 43, 129)"],
        backgroundColor: ["rgba(61, 12, 171, 0.3)", "rgba(214, 43, 129, 0.3)"],
        borderWidth: 1
      }
    ]
  };

  return <Doughnut data={data} />
}

function getMonthsInOrder() {
  const labels = [];

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  const currMonth = new Date().getMonth();

  for(let i = currMonth; i >= 0; i--) {
    const element = months[i];
    labels.unshift(element);
  }
  
  for (let i = 11; i > currMonth; i--) {
    const element = months[i];
    labels.unshift(element);
  }

  return labels;
}