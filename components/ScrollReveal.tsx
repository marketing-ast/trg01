import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ScrollRevealProps } from '../types';

export const ScrollReveal: React.FC<ScrollRevealProps> = ({ 
  children, 
  direction = 'up', 
  className = '',
  delay = 0 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Diverging effect logic
  // If direction is left, it moves further left as you scroll down (diverging)
  // If direction is right, it moves further right
  
  const xLeft = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50]);
  const xRight = useTransform(scrollYProgress, [0, 0.5, 1], [-50, 0, 50]);
  const yUp = useTransform(scrollYProgress, [0, 0.2], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  let style = {};
  if (direction === 'left') {
    style = { x: xLeft, opacity };
  } else if (direction === 'right') {
    style = { x: xRight, opacity };
  } else if (direction === 'up') {
    style = { y: yUp, opacity };
  } else {
    style = { opacity };
  }

  return (
    <motion.div
      ref={ref}
      style={style}
      className={className}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
};

export const StaticReveal: React.FC<{ children: React.ReactNode, delay?: number, className?: string }> = ({ children, delay = 0, className="" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
