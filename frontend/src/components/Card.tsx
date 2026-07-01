import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className={`overflow-hidden rounded-xl border border-border bg-surface shadow-sm transition-shadow hover:shadow-lg ${className}`}
    >
      {children}
    </motion.div>
  );
}
