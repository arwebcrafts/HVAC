"use client";

import { useEffect, useRef, type ReactNode, type HTMLAttributes } from "react";

type AnimatedSectionProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  id?: string;
};

/**
 * Lightweight scroll-reveal using IntersectionObserver + pure CSS transitions.
 * No JavaScript runs per scroll frame — 100% compositor-thread animation.
 */
export function AnimatedSection({ children, className = "", id, ...props }: AnimatedSectionProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      el.style.opacity = "1";
      el.style.transform = "none";
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id={id}
      className={className}
      style={{
        opacity: 0,
        transform: "translateY(28px)",
        transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
        willChange: "opacity, transform",
      }}
      {...props}
    >
      {children}
    </section>
  );
}
