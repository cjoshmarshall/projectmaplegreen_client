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

  let tree1 = []
  let tree2 = []
  for (let i = 0; i < trees.length; i++) {
    for (let j = 0; j < trees[i].length; j++) {
      if (i % 2 === 0) {
        tree1.push(trees[i][j].length)
      } else {
        tree2.push(trees[i][j].length)
      }
    }
  }
  console.log(tree1, tree2)

  const data: any = {
    labels: ['Mango', 'Apple', 'Orange', 'Banana', 'Cashew'],
    datasets: [
      {
        label: users[0],
        data: tree1,
        backgroundColor: [
          'rgba(255, 99, 132, 1)'
        ],
      }, {
        label: users[1],
        data: tree2,
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
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Trees Planted By Each User',
      },
    },
  }

  return (
    <div>
      <Bar data={data} height={400} width={400} options={options} className={className} />
    </div>
  )
}

export default BarChart