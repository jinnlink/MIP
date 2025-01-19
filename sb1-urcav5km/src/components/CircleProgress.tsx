import React from 'react';
import { motion } from 'framer-motion';

interface CircleProgressProps {
  isActive: boolean;
  onClick: () => void;
}

export const CircleProgress: React.FC<CircleProgressProps> = ({ isActive, onClick }) => {
  return (
    <motion.div
      className="relative w-48 h-48 cursor-pointer"
      whileHover={{ scale: 1.05 }}
      onClick={onClick}
    >
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          className="stroke-[#e6e6e6] fill-none"
          cx="50"
          cy="50"
          r="45"
          strokeWidth="2"
        />
        <motion.circle
          className="stroke-[var(--miku-primary)] fill-none circle-progress"
          cx="50"
          cy="50"
          r="45"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isActive ? 1 : 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.button
          className={`w-16 h-16 rounded-full ${
            isActive ? 'bg-[var(--miku-primary)]' : 'bg-[var(--miku-secondary)]'
          } text-white flex items-center justify-center shadow-lg button-hover`}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-2xl">
            {isActive ? '■' : '▶'}
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
}