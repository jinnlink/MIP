import React from 'react';
import { motion } from 'framer-motion';

interface Proxy {
  id: string;
  name: string;
  delay: number;
  active: boolean;
}

interface ProxyListProps {
  proxies: Proxy[];
  onSelect: (id: string) => void;
}

export const ProxyList: React.FC<ProxyListProps> = ({ proxies, onSelect }) => {
  return (
    <motion.div
      className="w-full max-w-md bg-white rounded-2xl shadow-xl p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-xl font-semibold text-[var(--miku-primary)] mb-4">节点列表</h2>
      <div className="space-y-2">
        {proxies.map((proxy) => (
          <motion.div
            key={proxy.id}
            className={`p-4 rounded-lg cursor-pointer ${
              proxy.active
                ? 'bg-[var(--miku-primary)] text-white'
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(proxy.id)}
          >
            <div className="flex justify-between items-center">
              <span className="font-medium">{proxy.name}</span>
              <span className={`text-sm ${proxy.active ? 'text-white' : 'text-gray-500'}`}>
                {proxy.delay}ms
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}