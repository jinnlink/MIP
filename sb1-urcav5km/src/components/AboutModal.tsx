import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">关于</h2>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full hover:bg-gray-100"
                  onClick={onClose}
                >
                  <IoClose size={24} className="text-gray-600" />
                </motion.button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-[#39c5bb] mb-2">📌 项目概述</h3>
                  <p className="text-gray-600 leading-relaxed">
                    MikuProxy致力于打造一个充满二次元风格的高性能代理工具，让每一次网络访问都像初音未来的歌声一样清澈悦耳。
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-[#39c5bb]">核心特点</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center space-x-2">
                      <span>🎨</span>
                      <span>二次元风格界面设计</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span>⚡</span>
                      <span>高性能代理加速</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span>🔒</span>
                      <span>安全可靠的数据传输</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span>🎮</span>
                      <span>交互式用户体验</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span>🌸</span>
                      <span>动态视觉特效</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500 text-center">
                    Version 1.0.0
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};