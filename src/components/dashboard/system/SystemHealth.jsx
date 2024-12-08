import React from 'react';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      },
      ticks: {
        color: 'rgba(255, 255, 255, 0.7)'
      }
    },
    x: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      },
      ticks: {
        color: 'rgba(255, 255, 255, 0.7)'
      }
    }
  }
};

export default function SystemHealth({ 
  cpuUsage, 
  memoryUsage, 
  networkTraffic, 
  errorRate 
}) {
  const metrics = [
    {
      label: 'CPU Usage',
      value: `${cpuUsage}%`,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20'
    },
    {
      label: 'Memory Usage',
      value: `${memoryUsage}%`,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20'
    },
    {
      label: 'Network Traffic',
      value: `${networkTraffic} MB/s`,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20'
    },
    {
      label: 'Error Rate',
      value: `${errorRate}%`,
      color: 'text-red-400',
      bgColor: 'bg-red-500/20'
    }
  ];

  const chartData = {
    labels: ['1m', '2m', '3m', '4m', '5m'],
    datasets: [
      {
        label: 'System Load',
        data: [cpuUsage, cpuUsage - 5, cpuUsage + 10, cpuUsage - 8, cpuUsage + 2],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.4
      }
    ]
  };

  return (
    <div className="glass-effect rounded-xl p-6">
      <h2 className="text-xl font-bold text-white mb-6">System Health</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-lg ${metric.bgColor}`}
          >
            <div className="text-sm text-gray-400 mb-1">{metric.label}</div>
            <div className={`text-xl font-bold ${metric.color}`}>
              {metric.value}
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="h-48">
        <Line options={chartOptions} data={chartData} />
      </div>
    </div>
  );
}