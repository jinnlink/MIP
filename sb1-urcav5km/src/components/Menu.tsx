import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose, IoCloudDownload, IoHelpCircle, IoInformationCircle } from 'react-icons/io5';

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateNodes: () => void;
  onShowHelp: () => void;
  onShowAbout: () => void;
}

export const Menu: React.FC<MenuProps> = ({
  isOpen,
  onClose,
  onUpdateNodes,
  onShowHelp,
  onShowAbout,
}) => {
  const menuItems = [
    {
      icon: <IoCloudDownload className="text-xl" />,
      label: '更新节点',
      onClick: onUpdateNodes,
    },
    {
      icon: <IoHelpCircle className="text-xl" />,
      label: '帮助',
      onClick: onShowHelp,
    },
    {
      icon: <IoInformationCircle className="text-xl" />,
      label: '关于',
      onClick: onShowAbout,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50"
          onClick={onClose}
        >
          <div className="absolute right-4 top-20 w-48">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-2">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={index}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
                    onClick={item.onClick}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.icon}
                    <span className="text-sm">{item.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};