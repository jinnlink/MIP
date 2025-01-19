import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPower } from 'react-icons/fi';
import { BsStopFill, BsLightningFill } from 'react-icons/bs';
import { RiSignalTowerLine, RiGlobalLine, RiListUnordered } from 'react-icons/ri';
import { FaServer } from 'react-icons/fa';
import { BiTime } from 'react-icons/bi';
import { NodeManagement } from './components/NodeManagement';
import { Menu } from './components/Menu';
import { HelpModal } from './components/HelpModal';
import { AboutModal } from './components/AboutModal';

export default function App() {
  const [isActive, setIsActive] = useState(false);
  const [selectedMode, setSelectedMode] = useState('global');
  const [currentNode, setCurrentNode] = useState('hk-01');
  const [isSpeedTesting, setIsSpeedTesting] = useState(false);
  const [connectionTime, setConnectionTime] = useState(0);
  const [isNodeManagementOpen, setIsNodeManagementOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  useEffect(() => {
    let timer: number;
    if (isActive) {
      timer = window.setInterval(() => {
        setConnectionTime(prev => prev + 1);
      }, 1000);
    } else {
      setConnectionTime(0);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isActive]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const modes = [
    { id: 'global', name: '全局', icon: <RiGlobalLine /> },
    { id: 'rules', name: '规则', icon: <RiListUnordered /> },
    { id: 'nodes', name: '节点列表', icon: <FaServer /> },
  ];

  const nodes = [
    { 
      id: 'hk-01',
      name: '香港 01', 
      delay: 120,
      location: '中国香港',
      type: 'IEPL',
      lastPing: '10s ago'
    },
    { 
      id: 'jp-01',
      name: '日本 01', 
      delay: 85,
      location: '日本东京',
      type: 'BGP',
      lastPing: '5s ago'
    },
    { 
      id: 'sg-01',
      name: '新加坡 01', 
      delay: 150,
      location: '新加坡',
      type: 'IPLC',
      lastPing: '15s ago'
    },
    { 
      id: 'us-01',
      name: '美国 01', 
      delay: 200,
      location: '美国洛杉矶',
      type: 'BGP',
      lastPing: '20s ago'
    },
  ];

  const currentNodeData = nodes.find(node => node.id === currentNode) || nodes[0];

  const handleSpeedTest = () => {
    setIsSpeedTesting(true);
    setTimeout(() => {
      setIsSpeedTesting(false);
    }, 2000);
  };

  const buttonVariants = {
    tap: {
      scale: 0.95,
      rotate: [-1, 1, -1, 0],
      transition: {
        rotate: {
          duration: 0.3,
          ease: "easeInOut"
        }
      }
    }
  };

  const circleVariants = {
    loading: {
      pathLength: 1,
      rotate: [0, 2, -2, 0],
      scale: [1, 1.02, 0.98, 1],
      transition: {
        pathLength: { duration: 2, ease: "easeInOut" },
        rotate: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        },
        scale: {
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    },
    idle: {
      pathLength: 0,
      rotate: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  const handleUpdateNodes = () => {
    setIsMenuOpen(false);
    window.location.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent('vmess://your-subscription-content');
  };

  return (
    <>
      <div className="min-h-screen bg-[#f0f7f7] p-4 android-touch">
        <motion.div 
          className="w-full max-w-sm mx-auto main-card rounded-3xl p-6 space-y-6"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-between items-center">
            <div>
              <motion.h1 
                className="text-2xl font-bold miku-title"
                initial={{ opacity: 0, y: 5 }}
                animate={{ 
                  opacity: [0.85, 1],
                  y: 0,
                  textShadow: [
                    "0 2px 4px rgba(57, 197, 187, 0.2)",
                    "0 4px 8px rgba(57, 197, 187, 0.3)",
                    "0 2px 4px rgba(57, 197, 187, 0.2)"
                  ]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              >
                MikuPower
              </motion.h1>
              <div className="flex items-center text-sm mt-2">
                <motion.div
                  animate={isActive ? {
                    scale: [1, 1.2, 1],
                  } : {}}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <RiSignalTowerLine className={`mr-1 ${isActive ? 'text-[#39c5bb]' : 'text-gray-400'}`} />
                </motion.div>
                <span className={isActive ? 'text-[#39c5bb] font-medium' : 'text-gray-400'}>
                  {isActive ? '已连接' : '未连接'}
                </span>
              </div>
            </div>
            <motion.button 
              className="p-3 rounded-full bg-gray-50 shadow-lg button-shadow"
              variants={buttonVariants}
              whileTap="tap"
              onClick={() => setIsMenuOpen(true)}
            >
              <div className="text-gray-400 text-xl">⋮</div>
            </motion.button>
          </div>

          <div className="relative">
            <svg className="w-full" viewBox="0 0 200 200">
              <defs>
                <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--miku-primary)" />
                  <stop offset="100%" stopColor="var(--miku-accent)" />
                </linearGradient>
              </defs>
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke="#f0f0f0"
                strokeWidth="4"
              />
              <motion.circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke="url(#circleGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                initial="idle"
                animate={isActive ? "loading" : "idle"}
                variants={circleVariants}
                className="glow circle-progress"
                style={{ transformOrigin: "center" }}
              />
            </svg>
            <motion.div 
              className="absolute inset-0 flex flex-col items-center justify-center text-center cursor-pointer"
              initial={false}
              animate={{ 
                scale: isActive ? [1, 1.05, 1] : 1,
                y: isActive ? [0, -2, 0] : 0
              }}
              transition={{ 
                duration: 2,
                repeat: isActive ? Infinity : 0,
                ease: "easeInOut"
              }}
              onClick={() => setIsNodeManagementOpen(true)}
            >
              <span className="text-base font-bold text-gray-600 mb-3 tracking-wide current-node-text">当前节点</span>
              <span className="text-2xl font-bold node-name mb-2">{currentNodeData.name}</span>
              <div className="flex items-center space-x-1">
                <span className="text-base font-semibold text-[#39c5bb]">{currentNodeData.delay}</span>
                <span className="text-sm font-medium text-[#39c5bb]">ms</span>
              </div>
              {isActive && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center timer-display mt-3"
                >
                  <BiTime className="text-[#39c5bb] mr-2" />
                  <span className="timer-text">{formatTime(connectionTime)}</span>
                </motion.div>
              )}
            </motion.div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {modes.map((mode) => (
              <motion.button
                key={mode.id}
                className={`p-4 rounded-xl flex flex-col items-center justify-center touch-button ${
                  selectedMode === mode.id
                    ? 'card-selected'
                    : 'card-normal'
                }`}
                variants={buttonVariants}
                whileTap="tap"
                onClick={() => {
                  setSelectedMode(mode.id);
                  if (mode.id === 'nodes') {
                    setIsNodeManagementOpen(true);
                  }
                }}
                initial={false}
                animate={{ 
                  scale: selectedMode === mode.id ? 1.02 : 1,
                  y: selectedMode === mode.id ? -2 : 0
                }}
                transition={{ duration: 0.3 }}
              >
                <span className={`text-2xl mb-2 ${selectedMode === mode.id ? 'text-[#39c5bb]' : 'text-gray-600'}`}>
                  {mode.icon}
                </span>
                <span className={`text-sm ${
                  selectedMode === mode.id 
                    ? 'text-[#39c5bb] font-medium' 
                    : 'text-gray-600'
                }`}>
                  {mode.name}
                </span>
              </motion.button>
            ))}
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-gray-600 tracking-wide">节点切换</span>
              <span className="text-sm font-bold text-[#39c5bb]">{currentNodeData.name}</span>
            </div>
            <input
              type="range"
              min="0"
              max={nodes.length - 1}
              value={nodes.findIndex(node => node.id === currentNode)}
              onChange={(e) => setCurrentNode(nodes[parseInt(e.target.value)].id)}
              className="w-full touch-slider"
            />
          </div>

          <div className="flex justify-center space-x-6">
            <AnimatePresence mode="wait">
              {isActive ? (
                <>
                  <motion.button
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ 
                      scale: 1, 
                      rotate: 0,
                      boxShadow: [
                        "8px 8px 16px rgba(239, 68, 68, 0.2), -4px -4px 12px rgba(255, 255, 255, 0.8)",
                        "12px 12px 24px rgba(239, 68, 68, 0.25), -6px -6px 16px rgba(255, 255, 255, 0.9)",
                        "8px 8px 16px rgba(239, 68, 68, 0.2), -4px -4px 12px rgba(255, 255, 255, 0.8)"
                      ]
                    }}
                    exit={{ scale: 0, rotate: 180 }}
                    variants={buttonVariants}
                    whileTap="tap"
                    transition={{
                      boxShadow: {
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                      }
                    }}
                    className="control-button bg-gradient-red"
                    onClick={() => setIsActive(false)}
                  >
                    <BsStopFill size={28} />
                  </motion.button>
                  <motion.button
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ 
                      scale: 1, 
                      rotate: 0,
                      boxShadow: [
                        "8px 8px 16px rgba(57, 197, 187, 0.2), -4px -4px 12px rgba(255, 255, 255, 0.8)",
                        "12px 12px 24px rgba(57, 197, 187, 0.25), -6px -6px 16px rgba(255, 255, 255, 0.9)",
                        "8px 8px 16px rgba(57, 197, 187, 0.2), -4px -4px 12px rgba(255, 255, 255, 0.8)"
                      ]
                    }}
                    exit={{ scale: 0, rotate: 180 }}
                    variants={buttonVariants}
                    whileTap="tap"
                    transition={{
                      boxShadow: {
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                      }
                    }}
                    className={`control-button bg-gradient ${
                      isSpeedTesting ? 'animate-pulse' : ''
                    }`}
                    onClick={handleSpeedTest}
                    disabled={isSpeedTesting}
                  >
                    <BsLightningFill size={28} />
                  </motion.button>
                </>
              ) : (
                <motion.button
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ 
                    scale: 1, 
                    rotate: 0,
                    boxShadow: [
                      "8px 8px 16px rgba(57, 197, 187, 0.2), -4px -4px 12px rgba(255, 255, 255, 0.8)",
                      "12px 12px 24px rgba(57, 197, 187, 0.25), -6px -6px 16px rgba(255, 255, 255, 0.9)",
                      "8px 8px 16px rgba(57, 197, 187, 0.2), -4px -4px 12px rgba(255, 255, 255, 0.8)"
                    ]
                  }}
                  exit={{ scale: 0, rotate: 180 }}
                  variants={buttonVariants}
                  whileTap="tap"
                  transition={{
                    boxShadow: {
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }
                  }}
                  className="control-button bg-gradient"
                  onClick={() => setIsActive(true)}
                >
                  <FiPower size={28} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <NodeManagement
        isOpen={isNodeManagementOpen}
        onClose={() => setIsNodeManagementOpen(false)}
        nodes={nodes}
        currentNode={currentNode}
        onSelectNode={(nodeId) => {
          setCurrentNode(nodeId);
          setIsNodeManagementOpen(false);
        }}
      />

      <Menu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onUpdateNodes={handleUpdateNodes}
        onShowHelp={() => {
          setIsMenuOpen(false);
          setIsHelpOpen(true);
        }}
        onShowAbout={() => {
          setIsMenuOpen(false);
          setIsAboutOpen(true);
        }}
      />

      <HelpModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />

      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />
    </>
  );
}