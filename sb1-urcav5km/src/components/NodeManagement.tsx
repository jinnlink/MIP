import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose, IoSpeedometer } from 'react-icons/io5';
import { FaSignal } from 'react-icons/fa';
import { BiTime } from 'react-icons/bi';

interface Node {
  id: string;
  name: string;
  delay: number;
  location: string;
  type: string;
  lastPing: string;
}

interface NodeManagementProps {
  isOpen: boolean;
  onClose: () => void;
  nodes: Node[];
  currentNode: string;
  onSelectNode: (nodeId: string) => void;
}

export const NodeManagement: React.FC<NodeManagementProps> = ({
  isOpen,
  onClose,
  nodes,
  currentNode,
  onSelectNode,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-full sm:w-[480px] bg-white rounded-t-3xl sm:rounded-3xl shadow-xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">节点列表</h2>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full hover:bg-gray-100"
                  onClick={onClose}
                >
                  <IoClose size={24} className="text-gray-600" />
                </motion.button>
              </div>
              
              <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                {nodes.map((node) => (
                  <motion.div
                    key={node.id}
                    whileTap={{ scale: 0.98 }}
                    className={`p-4 rounded-2xl cursor-pointer transition-all ${
                      currentNode === node.id
                        ? 'bg-[#39c5bb] text-white shadow-lg shadow-[#39c5bb]/20'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                    onClick={() => onSelectNode(node.id)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className={`font-semibold ${currentNode === node.id ? 'text-white' : 'text-gray-800'}`}>
                          {node.name}
                        </h3>
                        <p className={`text-sm mt-1 ${currentNode === node.id ? 'text-white/80' : 'text-gray-500'}`}>
                          {node.location}
                        </p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm ${
                        currentNode === node.id 
                          ? 'bg-white/20 text-white' 
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {node.type}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <IoSpeedometer className={`mr-1.5 ${
                          currentNode === node.id ? 'text-white' : 'text-gray-500'
                        }`} />
                        <span className={`text-sm ${
                          currentNode === node.id ? 'text-white' : 'text-gray-600'
                        }`}>{node.delay} ms</span>
                      </div>
                      <div className="flex items-center">
                        <FaSignal className={`mr-1.5 ${
                          currentNode === node.id ? 'text-white' : 'text-gray-500'
                        }`} />
                        <span className={`text-sm ${
                          currentNode === node.id ? 'text-white' : 'text-gray-600'
                        }`}>优</span>
                      </div>
                      <div className="flex items-center">
                        <BiTime className={`mr-1.5 ${
                          currentNode === node.id ? 'text-white' : 'text-gray-500'
                        }`} />
                        <span className={`text-sm ${
                          currentNode === node.id ? 'text-white' : 'text-gray-600'
                        }`}>{node.lastPing}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};