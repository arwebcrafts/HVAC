"use client";

import { Menu, Phone, X, Flame } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { siteConfig } from "@/lib/site-config";

const links = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/reviews", label: "Reviews" },
  { href: "/service-area", label: "Service Area" },
  { href: "/quote", label: "Request Quote" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  // Use a ref for lastY so the scroll handler always reads the latest value
  const lastYRef = useRef(typeof window !== "undefined" ? window.scrollY : 0);

  useEffect(() => {
    lastYRef.current = window.scrollY;

    function onScroll() {
      const currentY = window.scrollY;
      const lastY = lastYRef.current;

      setScrolled(currentY > 8);

      // Hide when scrolling DOWN past 120px threshold
      // Show IMMEDIATELY when scrolling UP even 1px
      if (currentY > lastY && currentY > 120) {
        setHidden(true);
      } else if (currentY < lastY) {
        setHidden(false);
      }

      lastYRef.current = currentY;

      // Scroll progress bar
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? Math.min((currentY / docHeight) * 100, 100) : 0);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-transform duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${
        scrolled
          ? "bg-[#07101f]/97 shadow-[0_4px_40px_rgba(10,22,40,0.7)] backdrop-blur-2xl border-b border-orange/25"
          : "bg-[#07101f]/80 backdrop-blur-md border-b border-white/5"
      }`}
    >
      {/* Scroll progress bar */}
      <div className="absolute bottom-0 left-0 h-[2px] bg-orange-gradient transition-all duration-150 ease-out" style={{ width: `${scrollProgress}%` }} />

      {/* Orange accent stripe visible only when scrolled */}
      {scrolled && (
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-orange via-orange-light to-orange-dark" />
      )}

      <nav className={`mx-auto flex max-w-7xl items-center justify-between px-5 lg:px-8 transition-all duration-300 ${scrolled ? "h-16" : "h-20"}`}>
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-gradient shadow-glow-sm transition-transform duration-300 group-hover:scale-110">
            <Flame size={18} className="text-white" />
          </div>
          <span className="text-lg font-black tracking-tight text-white">
            {siteConfig.name}
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link text-sm font-semibold text-white/80 transition-colors duration-200 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={siteConfig.phoneHref}
            className="inline-flex items-center gap-2 rounded-full bg-orange-gradient px-5 py-2.5 text-sm font-black text-white shadow-glow-sm transition-all duration-300 hover:shadow-glow hover:-translate-y-0.5 border border-orange/20"
          >
            <Phone size={15} />
            Call Now — 24/7
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          aria-label="Open menu"
          className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 p-2 text-white backdrop-blur-sm transition hover:bg-white/10 lg:hidden"
          onClick={() => setOpen(true)}
        >
          <Menu size={22} />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {open ? (
        <div className="fixed inset-0 z-[60] flex flex-col bg-navy px-5 py-6 lg:hidden overflow-hidden">
          {/* Background orbs */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-orange/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-orange/5 blur-3xl pointer-events-none" />

          <div className="relative flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2.5"
              onClick={() => setOpen(false)}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-gradient shadow-glow-sm">
                <Flame size={18} className="text-white" />
              </div>
              <span className="text-lg font-black text-white">{siteConfig.shortName}</span>
            </Link>
            <button
              type="button"
              aria-label="Close menu"
              className="rounded-xl border border-white/15 bg-white/5 p-2 text-white"
              onClick={() => setOpen(false)}
            >
              <X size={22} />
            </button>
          </div>

          <div className="relative mt-10 flex flex-col gap-2">
            {links.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/5 px-6 py-4 text-xl font-black text-white transition hover:bg-white/10 hover:border-orange/30"
                style={{ animationDelay: `${i * 60}ms` }}
                onClick={() => setOpen(false)}
              >
                {link.label}
                <span className="text-orange text-sm">→</span>
              </Link>
            ))}
          </div>

          <a
            href={siteConfig.phoneHref}
            className="relative mt-6 flex items-center justify-center gap-3 rounded-2xl bg-orange-gradient px-6 py-5 text-center text-xl font-black text-white shadow-glow transition hover:shadow-[0_0_50px_rgba(224,92,40,0.5)]"
          >
            <Phone size={22} />
            Call {siteConfig.phone}
          </a>

          <p className="mt-4 text-center text-sm text-white/40">
            Available 24/7 for emergencies
          </p>
        </div>
      ) : null}
    </header>
  );
}
