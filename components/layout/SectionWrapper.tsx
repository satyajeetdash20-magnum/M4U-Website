"use client";

import { motion } from "framer-motion";

const defaultVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function SectionWrapper({
  children,
  className = "",
  delay = 0,
}: SectionWrapperProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={defaultVariants}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
