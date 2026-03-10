"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface RevealOverlayProps {
  onComplete: () => void;
  isLoading?: boolean;
}

const RevealOverlay = ({ onComplete, isLoading = false }: RevealOverlayProps) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleStart = () => {
    if (isLoading) return;
    setIsClicked(true);
    setTimeout(onComplete, 800);
  };

  return (
    <AnimatePresence>
      {!isClicked && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100%",
            transition: { duration: 0.8, ease: [0.45, 0, 0.55, 1] } 
          }}
          onClick={handleStart}
          className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white text-[#003366] ${isLoading ? 'cursor-wait' : 'cursor-pointer'}`}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center space-y-12 px-6"
          >
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-serif tracking-[0.25em] uppercase font-light text-[#003366]">Alice</h1>
              <div className="h-[1px] w-32 bg-[#003366]/20 mx-auto" />
              <p className="text-lg md:text-xl font-light tracking-[0.4em] uppercase text-gray-400">15 Anos</p>
            </div>

            <div className="relative py-4 min-h-[60px] flex flex-col items-center justify-center">
              {isLoading ? (
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="w-6 h-6 animate-spin text-[#003366]/40" />
                  <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400">Carregando convite...</p>
                </div>
              ) : (
                <>
                  <motion.p 
                    animate={{ 
                      opacity: [0.3, 1, 0.3],
                      scale: [0.98, 1, 0.98]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 2.5,
                      ease: "easeInOut" 
                    }}
                    className="text-xs md:text-sm font-medium uppercase tracking-[0.5em] text-[#003366]"
                  >
                    Toque para abrir
                  </motion.p>
                  <motion.div 
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#003366] rounded-full"
                    animate={{ y: [0, 10, 0], opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RevealOverlay;