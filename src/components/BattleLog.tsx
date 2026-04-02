import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface BattleLogProps {
  logs: string[];
}

export const BattleLog: React.FC<BattleLogProps> = ({ logs }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div 
      ref={scrollRef}
      className="h-32 bg-slate-900/80 border-2 border-slate-700 rounded-lg p-3 overflow-y-auto font-mono text-sm space-y-1 scroll-smooth"
    >
      <AnimatePresence mode="popLayout">
        {logs.map((log, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={`${log.includes('Correct') ? 'text-green-400' : log.includes('Wrong') ? 'text-red-400' : 'text-slate-300'}`}
          >
            {`> ${log}`}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
