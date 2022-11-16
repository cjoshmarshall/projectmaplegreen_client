import React from 'react'
import { Chart as ChartJS, BarElement, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2'

ChartJS.register(
  BarElement,
  ...registerables
)

interface BarChartTypes {
  className: string,
  users: any,
  trees: any
}

function BarChart({
  className,
  users,
  trees
}: BarChartTypes) {

  const data: any = {
    labels: ['Apple', 'Mango', 'Orange', 'Banana', 'Cashew'],
    datasets: [
      {
        label: users[0],
        data: [1, 4, 7, 5, 2],
        backgroundColor: [
          'rgba(255, 99, 132, 1)'
        ],
      }, {
        label: users[1],
        data: [2, 3.8, 9, 5],
        backgroundColor: [
          'rgba(54, 162, 235, 1)',
        ]
      }
    ]
  }

  let options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    },
    legend: {
      labels: {
        fontSize: 26
      }
    }
  }

  return (
    <div>
      <Bar data={data} height={400} width={400} options={options} className={className} />
    </div>
  )
}

export default BarChart