import { ReactNode } from "react";

export interface CaseStudy {
  id: number;
  title: string;
  category: string;
  problem: string;
  solution: string;
  stats: {
    label: string;
    value: string;
    subtext?: string;
  }[];
}

export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ScrollRevealProps {
  children: ReactNode;
  direction?: 'left' | 'right' | 'up' | 'none';
  className?: string;
  delay?: number;
}
