"use client";

import { motion, type HTMLMotionProps, useReducedMotion } from "framer-motion";

type AnimatedSectionProps = HTMLMotionProps<"section">;

export function AnimatedSection({ children, className = "", ...props }: AnimatedSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      initial={prefersReducedMotion ? false : { opacity: 0, y: 32 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={className}
      {...props}
    >
      {children}
    </motion.section>
  );
}
