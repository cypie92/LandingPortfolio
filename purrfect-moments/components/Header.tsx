import React from 'react';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full px-6 py-6 md:px-12 flex justify-between items-center relative z-40"
    >
      <div className="flex items-center gap-3 bg-white dark:bg-paper-dark px-4 py-2 rounded-full border border-lavender shadow-sm rotate-[-2deg] hover:rotate-0 transition-transform cursor-pointer">
        <div className="size-8 bg-primary rounded-full flex items-center justify-center text-white">
          <span className="material-symbols-outlined text-lg">pets</span>
        </div>
        <h2 className="text-lg font-black tracking-tight text-primary">Purrfect Moments</h2>
      </div>
      
      <a 
        className="hidden md:flex items-center gap-2 text-sm font-bold text-lavender hover:text-primary transition-colors bg-white/50 px-4 py-2 rounded-full" 
        href="#"
      >
        <span>Client Login</span>
        <span className="material-symbols-outlined text-lg">login</span>
      </a>
    </motion.header>
  );
};

export default Header;