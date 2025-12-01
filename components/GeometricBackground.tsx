import React from 'react';
import { motion } from 'framer-motion';

const GeometricBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Ambient Gradient Mesh */}
      <div className="absolute top-0 left-0 w-full h-full bg-stone-950 opacity-100" />
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-amber-900/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-900/10 rounded-full blur-[100px]" />

      {/* Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#44403c1a_1px,transparent_1px),linear-gradient(to_bottom,#44403c1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Floating Geometry - Left Dodecahedron approximation */}
      <motion.div 
        className="absolute top-1/4 -left-12 opacity-20"
        animate={{ 
          rotate: 360,
          y: [0, -30, 0] 
        }}
        transition={{ 
          rotate: { duration: 40, repeat: Infinity, ease: "linear" },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <svg width="300" height="300" viewBox="0 0 100 100" className="stroke-amber-500 fill-none stroke-[0.5]">
          <path d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z" />
          <path d="M50 5 L50 50 L90 75" />
          <path d="M50 50 L10 75" />
          <path d="M10 25 L50 50 L90 25" />
        </svg>
      </motion.div>

       {/* Floating Geometry - Right Pyramid */}
       <motion.div 
        className="absolute bottom-1/3 -right-20 opacity-20"
        animate={{ 
          rotate: -360,
          y: [0, 40, 0] 
        }}
        transition={{ 
          rotate: { duration: 50, repeat: Infinity, ease: "linear" },
          y: { duration: 7, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <svg width="400" height="400" viewBox="0 0 100 100" className="stroke-orange-500 fill-none stroke-[0.5]">
          <polygon points="50,10 90,80 10,80" />
          <line x1="50" y1="10" x2="50" y2="80" />
          <line x1="10" y1="80" x2="50" y2="50" />
          <line x1="90" y1="80" x2="50" y2="50" />
        </svg>
      </motion.div>

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-amber-500/30 rounded-full"
          style={{
            width: Math.random() * 4 + 1 + 'px',
            height: Math.random() * 4 + 1 + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

export default GeometricBackground;
