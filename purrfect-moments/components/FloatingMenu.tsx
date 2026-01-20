import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const containerVariants = {
    hidden: { 
      opacity: 0,
      transition: { 
        staggerChildren: 0.05, 
        staggerDirection: -1
      } 
    },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.08,
        delayChildren: 0.05
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale: 1 }
  };

  return (
    <div 
      className="fixed bottom-8 right-8 z-50 group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="absolute bottom-full right-0 mb-4 flex flex-col gap-3 items-end"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={containerVariants}
          >
            <motion.button 
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white dark:bg-paper-dark text-primary p-3 rounded-full shadow-hard flex items-center gap-3 pr-6"
            >
              <span className="material-symbols-outlined">spa</span>
              <span className="font-bold whitespace-nowrap">Services</span>
            </motion.button>
            <motion.button 
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white dark:bg-paper-dark text-primary p-3 rounded-full shadow-hard flex items-center gap-3 pr-6"
            >
              <span className="material-symbols-outlined">photo_library</span>
              <span className="font-bold whitespace-nowrap">Gallery</span>
            </motion.button>
            <motion.button 
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white dark:bg-paper-dark text-primary p-3 rounded-full shadow-hard flex items-center gap-3 pr-6"
            >
              <span className="material-symbols-outlined">calendar_month</span>
              <span className="font-bold whitespace-nowrap">Book Now</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button 
        layout
        whileHover={{ y: -4, rotate: 12 }}
        whileTap={{ scale: 0.9 }}
        className="flex items-center justify-center size-16 bg-primary text-white rounded-full shadow-hard hover:shadow-hard-hover transition-all"
      >
        <span className="material-symbols-outlined text-3xl">{isOpen ? 'close' : 'menu'}</span>
      </motion.button>
    </div>
  );
};

export default FloatingMenu;