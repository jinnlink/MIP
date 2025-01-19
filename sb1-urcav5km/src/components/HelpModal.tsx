import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  const helpSections = [
    {
      title: '快速开始',
      content: '点击中央大按钮即可启动代理。启动后，所有网络流量将通过选定的节点进行转发。',
    },
    {
      title: '模式选择',
      content: '全局模式：所有流量都经过代理\n规则模式：根据规则列表选择性代理',
    },
    {
      title: '节点管理',
      content: '点击中央显示当前节点的区域可以打开节点管理页面，在这里可以查看所有可用节点并切换使用。',
    },
    {
      title: '测速功能',
      content: '连接状态下，点击闪电图标按钮可以对当前节点进行延迟测试。',
    },
    {
      title: '订阅更新',
      content: '点击右上角菜单中的"更新节点"可以手动更新节点列表。建议定期更新以获得最佳体验。',
    },
  ];

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
                <h2 className="text-xl font-bold text-gray-800">使用帮助</h2>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full hover:bg-gray-100"
                  onClick={onClose}
                >
                  <IoClose size={24} className="text-gray-600" />
                </motion.button>
              </div>
              
              <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                {helpSections.map((section, index) => (
                  <div key={index} className="space-y-2">
                    <h3 className="text-lg font-semibold text-[#39c5bb]">
                      {section.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                      {section.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};