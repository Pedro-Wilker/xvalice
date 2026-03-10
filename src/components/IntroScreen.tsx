"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

interface IntroScreenProps {
  onFinished: () => void;
}

const IntroScreen = ({ onFinished }: IntroScreenProps) => {
  const [isStarted, setIsStarted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const circleRef = useRef<SVGCircleElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleStart = () => {
    if (isStarted) return;
    setIsStarted(true);

    if (circleRef.current) {
      // O raio final é grande o suficiente para cobrir qualquer proporção de tela
      gsap.to(circleRef.current, {
        attr: { r: 1500 }, 
        duration: 2.5,
        ease: 'power2.inOut',
        onComplete: () => {
          setIsVisible(false);
          onFinished();
        }
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex flex-col items-center bg-white overflow-hidden md:max-w-[1080px] md:left-1/2 md:-translate-x-1/2 cursor-pointer"
          onClick={handleStart}
        >
          {/* SVG que contém a imagem 01.png com máscara de revelação */}
          <div className="relative w-full h-full">
            <svg 
              className="w-full h-full" 
              viewBox="0 0 1080 1920" // Proporção típica de convite vertical, ajustável conforme a imagem
              preserveAspectRatio="xMidYMin slice"
            >
              <defs>
                <filter id="displacementFilter">
                  <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="noise" />
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="80" xChannelSelector="R" yChannelSelector="G" />
                </filter>
                <mask id="circleMask">
                  <circle 
                    ref={circleRef}
                    cx="540" 
                    cy="960" 
                    r="0" 
                    fill="white" 
                    style={{ filter: 'url(#displacementFilter)' }}
                  />
                </mask>
              </defs>
              
              <image 
                xlinkHref="/01.png" 
                width="100%" 
                height="100%" 
                preserveAspectRatio="xMidYMin slice"
                mask="url(#circleMask)" 
              />
            </svg>

            {/* Overlay de texto inicial */}
            <AnimatePresence>
              {!isStarted && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-white/10 backdrop-blur-[2px]"
                >
                  <div className="bg-white/80 px-8 py-4 rounded-full shadow-xl border border-amber-100">
                    <h2 className="text-gray-800 text-lg md:text-2xl font-serif tracking-[0.2em] uppercase">
                      Clique para abrir
                    </h2>
                    <motion.div 
                      animate={{ y: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="text-center mt-2 text-amber-600 font-bold"
                    >
                      ↓
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroScreen;