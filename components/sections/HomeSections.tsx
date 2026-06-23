"use client";

import {
  ArrowRight,
  CheckCircle2,
  Clock,
  DollarSign,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  Zap,
  MessageCircle,
  Award,
  TrendingUp,
  Wrench,
  ThumbsUp,
  Calendar,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { ContactForm } from "@/components/sections/ContactForm";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cities } from "@/lib/cities";
import { reviews } from "@/lib/reviews";
import { services } from "@/lib/services";
import { siteConfig } from "@/lib/site-config";

const trustBadges = [
  { label: "NATE Certified", icon: "🏆" },
  { label: "BBB Accredited", icon: "✅" },
  { label: "5-Star Rated", icon: "⭐" },
  { label: "Same-Day Service", icon: "⚡" },
];

const whyChooseUs = [
  {
    icon: ShieldCheck,
    title: "Licensed & Insured",
    text: "Every technician is fully licensed, insured, and background-checked before stepping into your home.",
    stat: "100% verified",
  },
  {
    icon: DollarSign,
    title: "Upfront Pricing",
    text: "You get a clear written quote before we start. No hidden fees, no surprise charges — ever.",
    stat: "Zero surprises",
  },
  {
    icon: Zap,
    title: "Same-Day Service",
    text: "In most cases we arrive the same day you call — often within 2 hours of your request.",
    stat: "Avg. 2hr response",
  },
  {
    icon: Wrench,
    title: "All Brands Serviced",
    text: "Trane, Carrier, Lennox, Rheem, York, Goodman, Bryant — every major brand covered.",
    stat: "50+ brands",
  },
];

const steps = [
  {
    number: "01",
    icon: Phone,
    title: "Call or Book Online",
    text: "Reach us by phone, text, or our online form — 24/7. We confirm your appointment within 15 minutes.",
  },
  {
    number: "02",
    icon: Award,
    title: "We Diagnose",
    text: "A certified technician arrives, inspects the issue, and gives you a clear upfront price before starting.",
  },
  {
    number: "03",
    icon: Wrench,
    title: "We Fix It",
    text: "Work begins immediately with your approval. Most jobs are completed the same day.",
  },
  {
    number: "04",
    icon: ThumbsUp,
    title: "You Stay Comfortable",
    text: "We test the system thoroughly and follow up after the job to make sure everything is running perfectly.",
  },
];

const stats = [
  { value: 4800, suffix: "+", label: "HVAC Jobs Completed", icon: Wrench },
  { value: 500, suffix: "+", label: "Happy Customers", icon: ThumbsUp },
  { value: 24, suffix: "/7", label: "Emergency Availability", icon: Clock },
  { value: 2, suffix: " Hr", label: "Average Response Time", icon: Zap },
];

// Animated counter component
function CounterStat({
  value,
  suffix,
  label,
  icon: Icon,
}: {
  value: number;
  suffix: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const start = performance.now();
          function tick(now: number) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(ease * value));
            if (progress < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-3 group">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange/15 border border-orange/20 transition-all duration-300 group-hover:bg-orange/25 group-hover:scale-110">
        <Icon size={24} className="text-orange" />
      </div>
      <p className="text-4xl font-black text-white tabular-nums">
        {count}
        <span className="text-orange">{suffix}</span>
      </p>
      <p className="text-sm font-semibold text-white/55 text-center leading-tight">{label}</p>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-navy px-5 pb-24 pt-32 text-white md:pt-40 lg:px-8">
      {/* Animated background orbs */}
      <div className="hero-particles" aria-hidden="true" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 80% 80% at 50% -20%, rgba(224,92,40,0.25) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      {/* Emergency badge */}
      <div className="absolute right-5 top-24 z-10 animate-badge-pulse hidden md:block">
        <div className="flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 shadow-xl shadow-red-900/40">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
          </span>
          <span className="text-xs font-black uppercase tracking-wider text-white">
            Emergency Available Now
          </span>
        </div>
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left — Copy */}
        <div className="animate-fade-up">
          {/* Eyebrow chip */}
          <div className="inline-flex items-center gap-2 rounded-full border border-orange/40 bg-orange/10 px-4 py-2 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-orange animate-pulse" />
            <p className="text-sm font-bold text-white/90">
              🔧 Licensed & Insured | Florida&apos;s Trusted HVAC Team
            </p>
          </div>

          <h1 className="mt-7 max-w-3xl text-5xl font-black leading-[1.05] tracking-tight md:text-6xl lg:text-7xl text-balance">
            Fast, Reliable{" "}
            <span className="shimmer-text">HVAC Service</span> for Every
            Home
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65 md:text-xl">
            Heating, cooling & emergency repairs — we keep your home comfortable
            365 days a year. Licensed, insured, and locally trusted.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={siteConfig.phoneHref} size="lg" className="gap-2">
              <Phone size={18} />
              Call Now — 24/7 Emergency
            </ButtonLink>
            <ButtonLink href="#contact" variant="outline" size="lg">
              Get a Free Estimate
            </ButtonLink>
          </div>

          {/* Trust badges */}
          <div className="mt-10 flex flex-wrap gap-2.5">
            {trustBadges.map((badge) => (
              <span
                key={badge.label}
                className="flex items-center gap-1.5 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm font-semibold text-white/80 backdrop-blur-sm"
              >
                <span>{badge.icon}</span>
                {badge.label}
              </span>
            ))}
          </div>
        </div>

        {/* Right — CTA Card */}
        <div className="glass-card rounded-4xl p-1.5 shadow-glass">
          <div className="rounded-[22px] bg-white p-6 text-ink md:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-gradient shadow-glow-sm">
                <Zap size={20} className="text-white" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-orange">
                  Emergency Service
                </p>
                <p className="text-sm font-semibold text-muted">Available 24/7</p>
              </div>
            </div>

            <h2 className="mt-5 text-2xl font-black text-navy leading-tight">
              Need your comfort restored today?
            </h2>
            <p className="mt-2.5 leading-7 text-muted text-sm">
              Tell us what is happening and we will route the right technician
              with a clear arrival window.
            </p>

            <div className="mt-6 grid gap-3">
              {[
                "No cooling or no heat",
                "System leaking or making noise",
                "Ready for a replacement quote",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-grey bg-grey/60 p-3.5 transition hover:border-orange/30 hover:bg-orange/5"
                >
                  <CheckCircle2 className="shrink-0 text-orange" size={20} />
                  <span className="text-sm font-bold text-navy">{item}</span>
                </div>
              ))}
            </div>

            <ButtonLink href="/contact" variant="dark" className="mt-6 w-full" size="lg">
              Schedule Service Now
            </ButtonLink>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              Technicians available right now
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
        <span className="text-xs font-semibold uppercase tracking-widest text-white/30">
          Scroll
        </span>
        <div className="h-8 w-5 rounded-full border border-white/20 flex items-start justify-center pt-1.5">
          <div className="h-2 w-0.5 rounded-full bg-white/40 animate-bounce" />
        </div>
      </div>
    </section>
  );
}

export function SocialProofStrip() {
  return (
    <section className="border-b border-slate-100 bg-white px-5 py-6 lg:px-8 shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm font-semibold text-muted">
          Trusted by{" "}
          <span className="font-black text-navy">500+ homeowners</span> and
          businesses across Florida
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            { label: "⭐ Google 5.0", color: "text-amber-600 bg-amber-50 border-amber-200" },
            { label: "✅ BBB Accredited", color: "text-blue-700 bg-blue-50 border-blue-200" },
            { label: "🏆 NATE Certified", color: "text-green-700 bg-green-50 border-green-200" },
            { label: "⚡ ENERGY STAR", color: "text-purple-700 bg-purple-50 border-purple-200" },
          ].map((item) => (
            <span
              key={item.label}
              className={`rounded-full border px-4 py-1.5 text-xs font-black ${item.color}`}
            >
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServicesGrid() {
  return (
    <AnimatedSection className="px-5 py-24 lg:px-8 bg-grey/40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Our Services"
          title="Everything You Need"
          accentTitle="Under One Roof"
          subtitle="From emergency repairs to full system installs — every service backed by licensed technicians and upfront pricing."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="service-card group rounded-3xl border border-slate-100 bg-white p-6 shadow-card"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Icon */}
                <div className="relative inline-flex">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange/10 text-orange transition-all duration-300 group-hover:bg-orange-gradient group-hover:text-white group-hover:shadow-glow-sm">
                    <Icon size={26} />
                  </div>
                </div>

                <h3 className="mt-5 text-lg font-black text-navy">{service.title}</h3>
                <p className="mt-2.5 leading-7 text-muted text-sm">{service.description}</p>

                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-black text-orange transition-all duration-200 group-hover:gap-2.5">
                  Learn More <ArrowRight size={15} />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}

export function WhyChooseUs() {
  return (
    <AnimatedSection className="relative overflow-hidden bg-navy px-5 py-24 lg:px-8">
      {/* Background effects */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 80% 50%, rgba(224,92,40,0.3) 0%, transparent 70%)",
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

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Why choose us"
              title="Built on Trust,"
              accentTitle="Backed by Results"
              subtitle="A strong local HVAC company needs more than great equipment — it needs proof, speed, and people you can count on."
            />
            <ButtonLink href="/about" variant="outline" className="mt-8" size="lg">
              Meet Our Team <ChevronRight size={16} />
            </ButtonLink>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {whyChooseUs.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group relative overflow-hidden rounded-3xl border border-white/8 bg-white/6 p-6 backdrop-blur-sm transition-all duration-300 hover:border-orange/30 hover:bg-white/10"
                >
                  {/* Subtle top border gradient */}
                  <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-orange/40 to-transparent" />

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange/15 border border-orange/20 transition-all duration-300 group-hover:bg-orange-gradient group-hover:border-transparent group-hover:shadow-glow-sm">
                    <Icon className="text-orange transition-colors group-hover:text-white" size={22} />
                  </div>

                  <h3 className="mt-4 text-base font-black text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/60">{item.text}</p>

                  <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-orange/15 px-3 py-1 text-xs font-black text-orange">
                    ✓ {item.stat}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

export function ResultsSection() {
  return (
    <AnimatedSection className="px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Before & After"
          title="See the Difference"
          accentTitle="We Make"
          subtitle="Real results from real jobs. Clean installations, better airflow, improved efficiency."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "AC Unit Replacement",
              caption: "Old R-22 unit replaced with a new high-efficiency system.",
              tag: "Energy Savings",
            },
            {
              title: "Air Duct Cleaning",
              caption: "Ducts cleaned — better air quality, lower energy bills.",
              tag: "Air Quality",
            },
            {
              title: "Furnace Installation",
              caption: "Full furnace replacement with neat, organized installation.",
              tag: "Heating Upgrade",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="group overflow-hidden rounded-4xl bg-white shadow-card card-hover border border-slate-100"
            >
              {/* Before/After visual */}
              <div className="relative grid h-56 grid-cols-2">
                {/* Before */}
                <div className="relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-700 to-slate-900">
                  <div className="absolute inset-0 bg-slate-800/50" />
                  <span className="relative text-xs font-black uppercase tracking-[0.25em] text-white/70">
                    Before
                  </span>
                  {/* Label */}
                  <div className="absolute bottom-2 left-2 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-bold text-white/60 backdrop-blur-sm">
                    Before
                  </div>
                </div>

                {/* After */}
                <div className="relative flex items-center justify-center overflow-hidden bg-orange-gradient">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange/80 to-orange-dark" />
                  <span className="relative text-xs font-black uppercase tracking-[0.25em] text-white">
                    After
                  </span>
                  {/* Label */}
                  <div className="absolute bottom-2 right-2 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm">
                    After ✨
                  </div>
                </div>

                {/* Center divider */}
                <div className="absolute inset-y-0 left-1/2 flex -translate-x-1/2 items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-xl text-navy font-black text-xs z-10">
                    ↔
                  </div>
                </div>

                {/* Tag */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="rounded-full bg-orange-gradient px-2.5 py-1 text-[10px] font-black text-white shadow-sm">
                    {card.tag}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-black text-navy">{card.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{card.caption}</p>
                <Link
                  href="/contact"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-black text-orange hover:gap-2.5 transition-all duration-200"
                >
                  Get this result <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

export function ReviewsSection() {
  return (
    <AnimatedSection className="relative overflow-hidden bg-grey/50 px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Customer Reviews"
          title="What Customers Say"
          accentTitle="After We Fix It"
          subtitle="Real reviews from homeowners across Florida — speed, clarity, clean work, and fair pricing."
        />

        {/* Review cards */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {reviews.slice(0, 3).map((review) => (
            <figure
              key={review.name}
              className="review-card relative overflow-hidden rounded-4xl bg-white p-6 shadow-card border border-slate-100"
            >
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-orange-gradient" />

              {/* Google logo */}
              <div className="flex items-center justify-between">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm border border-slate-100">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                </div>
                <div className="flex gap-0.5 text-amber-400">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} size={14} fill="currentColor" />
                  ))}
                </div>
              </div>

              <blockquote className="mt-4 text-sm leading-7 text-muted">
                &ldquo;{review.text}&rdquo;
              </blockquote>

              <figcaption className="mt-5 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-gradient text-sm font-black text-white shadow-glow-sm">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-black text-navy">{review.name}</p>
                  <p className="text-xs text-muted">{review.city}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-10 text-center">
          <ButtonLink href="/reviews" variant="ghost" size="lg">
            See All Reviews <ArrowRight size={16} />
          </ButtonLink>
        </div>
      </div>
    </AnimatedSection>
  );
}

export function FinancingBanner() {
  return (
    <section className="relative overflow-hidden bg-orange-gradient px-5 py-20 text-center text-white lg:px-8">
      {/* Background shine effect */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(ellipse 50% 100% at 50% -20%, rgba(255,255,255,0.5) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-2 backdrop-blur-sm">
          <TrendingUp size={14} />
          <span className="text-xs font-black uppercase tracking-wider">
            Flexible Financing Options
          </span>
        </div>

        <h2 className="text-4xl font-black tracking-tight md:text-5xl lg:text-6xl text-balance">
          New System? 0% Financing Available.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/85">
          We make it easy to upgrade your home comfort without the upfront cost.
          Quick approval, flexible terms, and no credit impact to check.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <ButtonLink href="/financing" variant="secondary" size="lg">
            Check Your Options — No Credit Impact
          </ButtonLink>
          <ButtonLink href={siteConfig.phoneHref} variant="outline" size="lg">
            <Phone size={16} />
            Ask About Financing
          </ButtonLink>
        </div>

        <p className="mt-6 text-xs text-white/60">
          Subject to credit approval. Ask your technician for details.
        </p>
      </div>
    </section>
  );
}

export function HowItWorks() {
  return (
    <AnimatedSection className="px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Our Process"
          title="Getting Help Is"
          accentTitle="Simple"
          subtitle="Four clear steps from first call to full comfort — no confusion, no runaround."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="relative group">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="absolute top-7 left-[calc(50%+32px)] right-0 hidden h-px bg-gradient-to-r from-orange/40 to-transparent md:block" />
                )}

                <div className="rounded-3xl bg-grey/60 border border-slate-100 p-6 transition-all duration-300 hover:border-orange/20 hover:shadow-card hover:-translate-y-1">
                  {/* Number + Icon */}
                  <div className="relative">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-gradient text-white shadow-glow-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-glow">
                      <Icon size={22} />
                    </div>
                    <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-navy text-[10px] font-black text-white">
                      {step.number}
                    </div>
                  </div>

                  <h3 className="mt-5 text-base font-black text-navy">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{step.text}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats strip */}
        <div className="mt-12 overflow-hidden rounded-4xl bg-navy p-8 md:p-12">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <CounterStat
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                icon={stat.icon}
              />
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

export function ServiceAreaSection() {
  return (
    <AnimatedSection className="relative overflow-hidden bg-grey/40 px-5 py-24 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-start">
        {/* Map placeholder */}
        <div className="relative overflow-hidden rounded-4xl bg-navy shadow-glass">
          <div className="flex h-[440px] items-center justify-center">
            {/* Animated background */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background:
                  "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(224,92,40,0.25) 0%, transparent 70%)",
              }}
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
              aria-hidden="true"
            />

            <div className="relative text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-orange-gradient shadow-glow animate-float">
                <MapPin size={36} className="text-white" />
              </div>
              <p className="mt-5 text-3xl font-black text-white">Florida Service Area</p>
              <p className="mt-2 text-white/55">Google Maps embed ready for your address</p>
              <div className="mt-6 flex items-center justify-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm text-green-400 font-semibold">Covering all major FL cities</span>
              </div>
            </div>
          </div>
        </div>

        {/* City list */}
        <div>
          <SectionHeading
            align="left"
            eyebrow="Service area"
            title="We Serve"
            accentTitle="Your Area"
            subtitle="Local service across Florida's major cities. Call to confirm your location."
          />

          <div className="mt-8 flex flex-wrap gap-2">
            {cities.map((city) => (
              <span
                key={city}
                className="rounded-full border border-navy/12 bg-white px-4 py-2 text-sm font-bold text-navy shadow-sm transition hover:border-orange/30 hover:bg-orange/5 hover:text-orange cursor-default"
              >
                📍 {city}
              </span>
            ))}
          </div>

          <div className="mt-8 overflow-hidden rounded-3xl border border-orange/20 bg-white p-6 shadow-card">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-gradient shadow-glow-sm">
                <Clock className="text-white" size={18} />
              </div>
              <p className="font-black text-navy">Not sure if we cover your area?</p>
            </div>
            <p className="mt-3 text-sm text-muted leading-6">
              Call us now and we will confirm in 30 seconds. No waiting, no automated menus.
            </p>
            <ButtonLink href={siteConfig.phoneHref} className="mt-5 w-full" size="md">
              <Phone size={16} />
              Call Now — Instant Confirmation
            </ButtonLink>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

export function ContactSection() {
  return (
    <AnimatedSection id="contact" className="px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Schedule service"
          title="Ready to Get"
          accentTitle="Comfortable Again?"
          subtitle="Book online or call now — we respond fast. All requests acknowledged within 15 minutes."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-start">
          {/* Contact info */}
          <div className="order-2 lg:order-1">
            <div className="grid gap-5">
              {/* Phone */}
              <div className="group flex items-center gap-4 rounded-3xl border border-slate-100 bg-white p-5 shadow-card transition hover:border-orange/20 hover:shadow-hover">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-gradient shadow-glow-sm">
                  <Phone size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted">Phone</p>
                  <a
                    href={siteConfig.phoneHref}
                    className="text-2xl font-black text-orange hover:text-orange-dark transition-colors"
                  >
                    {siteConfig.phone}
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="group flex items-center gap-4 rounded-3xl border border-slate-100 bg-white p-5 shadow-card transition hover:border-green-200 hover:shadow-md">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#25D366] shadow-md">
                  <MessageCircle size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted">WhatsApp</p>
                  <a
                    href={siteConfig.whatsappHref}
                    className="text-base font-black text-navy hover:text-[#25D366] transition-colors"
                  >
                    Chat with us now
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4 rounded-3xl border border-slate-100 bg-white p-5 shadow-card">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-navy shadow-md">
                  <Award size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted">Email</p>
                  <p className="text-base font-black text-navy">{siteConfig.email}</p>
                </div>
              </div>

              {/* Hours */}
              <div className="rounded-3xl border border-slate-100 bg-grey/60 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar size={16} className="text-orange" />
                  <p className="text-sm font-black text-navy">Business Hours</p>
                </div>
                {siteConfig.hours.map((hour) => (
                  <p key={hour} className="text-sm font-semibold text-muted py-0.5">
                    {hour}
                  </p>
                ))}
              </div>
            </div>

            {/* Emergency badge */}
            <div className="mt-5 flex items-center gap-3 rounded-3xl border border-red-100 bg-red-50 p-5">
              <span className="relative flex h-3 w-3 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500" />
              </span>
              <p className="text-sm font-black text-red-700">
                Emergency? We answer 24/7 — no wait, no automated menu.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="order-1 lg:order-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
