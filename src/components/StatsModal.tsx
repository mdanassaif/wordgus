// components/StatsModal.tsx
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Stats } from "@/lib/store";
import { motion } from 'framer-motion';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: Stats;
}

export function StatsModal({ isOpen, onClose, stats }: StatsModalProps) {
  const totalGames = stats.gamesPlayed;
  const winPercentage = totalGames > 0 ? Math.round((stats.gamesWon / totalGames) * 100) : 0;
  const gamesLost = totalGames - stats.gamesWon;

  const chartData = {
    labels: ['Games Won', 'Games Lost'],
    datasets: [
      {
        data: [stats.gamesWon, gamesLost],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
        borderColor: ['rgb(75, 192, 192)', 'rgb(255, 99, 132)'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Game Results',
      },
    },
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-4 text-white">Global Statistics</DialogTitle>
        </DialogHeader>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 gap-6 text-center mb-6 text-black dark:text-black"
        >
          <StatItem title="Total Games" value={totalGames} />
          <StatItem title="Win Rate" value={`${winPercentage}%`} />
          <StatItem title="Games Won" value={stats.gamesWon} />
          <StatItem title="Games Lost" value={gamesLost} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='bg-white dark:bg-gray-800 rounded-lg shadow-md'
      
        >
          <Bar data={chartData} options={chartOptions}  />
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}

function StatItem({ title, value }: { title: string; value: number | string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md"
    >
      <div className="text-3xl font-bold mb-2">{value}</div>
      <div className="text-sm text-gray-600 dark:text-gray-400">{title}</div>
    </motion.div>
  );
}