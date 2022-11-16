import React from 'react'
import { Chart as ChartJS, LineElement, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2'

ChartJS.register(
  LineElement,
  ...registerables
)

interface AreaChartTypes {
  className: string,
  users: any,
  trees: any
}

function AreaChart({
  className,
  users,
  trees
}: AreaChartTypes) {
  const data: any = {
    labels: users,
    datasets: [{
      label: 'Total Number of Trees',
      data: trees,
      fill: true,
      backgroundColor: [
        'rgba(255, 99, 132, 0.7)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)'
      ],
      borderWidth: 1
    }]
  }

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'USERS & TREES',
      },
    },
  }

  return (
    <div className={className}>
      <Line data={data} height={400} options={options} className={className} />
    </div>
  )
}

export default AreaChart