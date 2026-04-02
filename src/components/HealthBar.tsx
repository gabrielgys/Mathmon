import React from 'react';
import { motion } from 'motion/react';

interface HealthBarProps {
  current: number;
  max: number;
  label: string;
  color: string;
}

export const HealthBar: React.FC<HealthBarProps> = ({ current, max, label, color }) => {
  const percentage = Math.max(0, (current / max) * 100);
  
  return (
    <div className="w-full">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-bold uppercase tracking-wider text-slate-300">{label}</span>
        <span className="text-sm font-mono">{current}/{max}</span>
      </div>
      <div className="h-4 bg-slate-800 rounded-full overflow-hidden border-2 border-slate-700">
        <motion.div
          initial={{ width: '100%' }}
          animate={{ width: `${percentage}%` }}
          transition={{ type: 'spring', stiffness: 50, damping: 15 }}
          className={`h-full ${color} shadow-[0_0_10px_rgba(0,0,0,0.5)]`}
        />
      </div>
    </div>
  );
};
