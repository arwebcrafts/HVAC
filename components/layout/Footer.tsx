import { Flame, MapPin, Phone, Mail, Clock } from "lucide-react";
import Link from "next/link";

import { services } from "@/lib/services";
import { siteConfig } from "@/lib/site-config";

const companyLinks = [
  { href: "/about", label: "About Us" },
  { href: "/reviews", label: "Reviews" },
  { href: "/service-area", label: "Service Area" },
  { href: "/financing", label: "Financing" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy Policy" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy pb-20 text-white md:pb-0">
      {/* Background effects */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(ellipse 50% 80% at 10% 100%, rgba(224,92,40,0.25) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      {/* Top accent line */}
      <div className="h-1 w-full bg-orange-gradient" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-[1.5fr_1fr_1fr_1.1fr] lg:px-8">
        {/* Brand column */}
        <div>
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-gradient shadow-glow-sm transition-transform group-hover:scale-110">
              <Flame size={20} className="text-white" />
            </div>
            <span className="text-xl font-black tracking-tight">{siteConfig.name}</span>
          </Link>

          <p className="mt-5 max-w-xs leading-7 text-white/60 text-sm">
            {siteConfig.name} provides HVAC repair, replacement, air quality, and
            maintenance service across {siteConfig.county}. Open 24 hours.
          </p>

          {/* Contact quick-links */}
          <div className="mt-6 grid gap-3">
            <a
              href={siteConfig.phoneHref}
              className="flex items-center gap-2.5 text-sm text-white/70 transition hover:text-orange"
            >
              <Phone size={15} className="text-orange" />
              {siteConfig.phone}
            </a>
            {siteConfig.email ? (
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2.5 text-sm text-white/70 transition hover:text-orange"
              >
                <Mail size={15} className="text-orange" />
                {siteConfig.email}
              </a>
            ) : null}
            <span className="flex items-start gap-2.5 text-sm text-white/70">
              <MapPin size={15} className="text-orange mt-0.5 shrink-0" />
              {siteConfig.address.street}, {siteConfig.address.city},{" "}
              {siteConfig.address.state} {siteConfig.address.zip}
            </span>
          </div>

          {/* Social row */}
          <div className="mt-7 flex gap-2">
            {[
              { href: siteConfig.socials.facebook, label: "FB" },
              { href: siteConfig.socials.instagram, label: "IG" },
              { href: siteConfig.socials.google, label: "G" },
              { href: siteConfig.socials.yelp, label: "Y" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-xs font-black text-white/60 transition hover:border-orange/40 hover:bg-orange/10 hover:text-orange"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Services column */}
        <div>
          <p className="mb-5 text-xs font-black uppercase tracking-[0.2em] text-orange">
            Services
          </p>
          <div className="grid gap-3">
            {services.slice(0, 7).map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="text-sm text-white/60 transition hover:text-white hover:translate-x-0.5 inline-block"
              >
                {service.title}
              </Link>
            ))}
          </div>
        </div>

        {/* Company column */}
        <div>
          <p className="mb-5 text-xs font-black uppercase tracking-[0.2em] text-orange">
            Company
          </p>
          <div className="grid gap-3">
            {companyLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/60 transition hover:text-white hover:translate-x-0.5 inline-block"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Hours column */}
        <div>
          <p className="mb-5 text-xs font-black uppercase tracking-[0.2em] text-orange">
            Hours
          </p>
          <div className="grid gap-3">
            {siteConfig.hours.map((hour) => (
              <p key={hour} className="text-sm text-white/60">
                {hour}
              </p>
            ))}
          </div>

          {/* Emergency CTA */}
          <a
            href={siteConfig.phoneHref}
            className="mt-8 flex items-center gap-2.5 rounded-2xl border border-orange/30 bg-orange/10 p-4 transition hover:bg-orange/20"
          >
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-orange" />
            </span>
            <div>
              <p className="text-xs font-black text-orange">Emergency Service</p>
              <p className="text-xs text-white/60">Available 24/7</p>
            </div>
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/8">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-white/40 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>© 2026 {siteConfig.name}. All rights reserved.</p>
          <p>Licensed & Insured | {siteConfig.license}</p>
        </div>
      </div>
    </footer>
  );
}
