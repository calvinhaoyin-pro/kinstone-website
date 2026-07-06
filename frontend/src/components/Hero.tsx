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
    <section className="relative overflow-hidden border-b border-border bg-bg">
      {/* Swiss grid overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:64px_64px]"
      />
      {/* Arc-red glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-accent/20 blur-[120px]"
      />

      <div className="container-page relative flex flex-col items-start gap-8 py-28 sm:py-36">
        {eyebrow ? (
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="label-mono flex items-center gap-2 text-accent"
          >
            <span aria-hidden="true">*</span>
            {eyebrow}
          </motion.span>
        ) : null}

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-4xl text-5xl font-extrabold leading-[0.98] tracking-tight text-primary sm:text-6xl lg:text-7xl"
        >
          {title}
        </motion.h1>

        {subtitle ? (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl text-lg leading-relaxed text-text-muted"
          >
            {subtitle}
          </motion.p>
        ) : null}

        {children ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-2 flex flex-wrap gap-3"
          >
            {children}
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
