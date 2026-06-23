"use client";

import { MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { siteConfig } from "@/lib/site-config";

export function FloatingActions() {
  const [showWhatsApp, setShowWhatsApp] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowWhatsApp(true), 3000);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Emergency side tab */}
      <Link
        href="/contact"
        className="fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 rounded-l-2xl bg-orange-gradient px-3 py-5 shadow-glow transition-all duration-300 hover:pr-4 md:block"
        aria-label="Emergency HVAC service"
      >
        <span className="[writing-mode:vertical-rl] text-xs font-black uppercase tracking-[0.2em] text-white">
          🚨 Emergency
        </span>
      </Link>

      {/* WhatsApp bubble */}
      {showWhatsApp ? (
        <a
          href={siteConfig.whatsappHref}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          className="fixed bottom-24 right-5 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-green-900/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl md:inline-flex"
          style={{ animation: "slide-in-right 0.5s cubic-bezier(0.34,1.56,0.64,1) both" }}
        >
          <MessageCircle size={26} />
          {/* Tooltip */}
          <span className="absolute right-16 whitespace-nowrap rounded-xl bg-white px-3 py-1.5 text-xs font-black text-[#25D366] shadow-lg opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none">
            Chat with us
          </span>
        </a>
      ) : null}

      {/* 24/7 phone pill */}
      <a
        href={siteConfig.phoneHref}
        className="fixed bottom-6 right-5 z-40 hidden items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-navy shadow-glass transition-all duration-300 hover:-translate-y-1 hover:shadow-xl lg:inline-flex border border-slate-100"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-orange" />
        </span>
        <Phone size={15} className="text-orange" />
        24/7 Emergency
      </a>
    </>
  );
}
