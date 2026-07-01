import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface HeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}

export default function Hero({ eyebrow, title, subtitle, children }: HeroProps) {
  return (
    <section className="border-b border-border bg-gradient-to-b from-surface to-bg">
      <div className="container-page flex flex-col items-start gap-6 py-20 sm:py-28">
        {eyebrow ? (
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent"
          >
            {eyebrow}
          </motion.span>
        ) : null}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h1>
        {subtitle ? (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl text-lg text-text-muted"
          >
            {subtitle}
          </motion.p>
        ) : null}
        {children ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            {children}
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
