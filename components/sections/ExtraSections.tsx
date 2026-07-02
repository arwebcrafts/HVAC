"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  DollarSign,
  Flame,
  Phone,
  Shield,
  Snowflake,
  Star,
  Tag,
  ThumbsUp,
  TrendingDown,
  Wrench,
  Zap,
  BadgeCheck,
  CalendarClock,
  Percent,
  X,
  Maximize2,
  MapPin,
} from "lucide-react";
import Link from "next/link";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/lib/site-config";

/* ─────────────────────────────────────────────────────────────────────
   1. SEASONAL PROMO TICKER BANNER
   ───────────────────────────────────────────────────────────────────── */
const promos = [
  "🌞 Summer Special — AC Tune-Up for just $49  (Save $80)",
  "⚡ Same-Day Emergency Service Available — Call Now",
  "💰 0% Financing on New Systems — No Credit Impact to Check",
  "🏆 NATE Certified Technicians — Satisfaction Guaranteed",
  "📅 Free Second Opinion on Any Repair Quote",
  "✅ All Makes & Models Serviced — Carrier, Trane, Lennox & More",
];

export function SeasonalBanner() {
  return (
    <div className="relative overflow-hidden bg-orange-gradient py-3 z-30">
      <div className="flex whitespace-nowrap animate-ticker">
        {[...promos, ...promos].map((promo, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 px-10 text-sm font-black text-white"
          >
            {promo}
            <span className="mx-4 text-white/40">|</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   2. QUOTE ESTIMATOR — multi-step interactive tool
   ───────────────────────────────────────────────────────────────────── */
type ServiceType = {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  ranges: Record<string, [number, number]>;
};

const SERVICES: ServiceType[] = [
  {
    id: "ac-repair",
    label: "AC Repair",
    icon: Wrench,
    ranges: {
      "under-1000": [150, 350],
      "1000-1500": [150, 400],
      "1500-2500": [200, 450],
      "2500-3500": [200, 500],
      "3500+": [250, 600],
    },
  },
  {
    id: "ac-install",
    label: "AC Installation",
    icon: Snowflake,
    ranges: {
      "under-1000": [2800, 4200],
      "1000-1500": [3200, 5000],
      "1500-2500": [3800, 6000],
      "2500-3500": [4500, 7500],
      "3500+": [6000, 10000],
    },
  },
  {
    id: "furnace-repair",
    label: "Furnace Repair",
    icon: Flame,
    ranges: {
      "under-1000": [150, 400],
      "1000-1500": [150, 450],
      "1500-2500": [200, 500],
      "2500-3500": [200, 550],
      "3500+": [250, 650],
    },
  },
  {
    id: "furnace-install",
    label: "Furnace Install",
    icon: Flame,
    ranges: {
      "under-1000": [2200, 3800],
      "1000-1500": [2500, 4500],
      "1500-2500": [3000, 5500],
      "2500-3500": [3800, 7000],
      "3500+": [5000, 9000],
    },
  },
  {
    id: "tune-up",
    label: "Tune-Up / Maintenance",
    icon: CheckCircle2,
    ranges: {
      "under-1000": [49, 99],
      "1000-1500": [49, 99],
      "1500-2500": [79, 119],
      "2500-3500": [79, 139],
      "3500+": [99, 159],
    },
  },
  {
    id: "emergency",
    label: "Emergency Service",
    icon: Zap,
    ranges: {
      "under-1000": [200, 500],
      "1000-1500": [200, 550],
      "1500-2500": [250, 600],
      "2500-3500": [300, 700],
      "3500+": [350, 850],
    },
  },
];

const HOME_SIZES = [
  { id: "under-1000", label: "Under 1,000 sq ft", sub: "Studio / Small home" },
  { id: "1000-1500", label: "1,000 – 1,500 sq ft", sub: "Average home" },
  { id: "1500-2500", label: "1,500 – 2,500 sq ft", sub: "Large home" },
  { id: "2500-3500", label: "2,500 – 3,500 sq ft", sub: "Very large home" },
  { id: "3500+", label: "3,500+ sq ft", sub: "Luxury / Commercial" },
];

const URGENCY = [
  { id: "emergency", label: "Emergency — Today", icon: "🚨", note: "Rush fee may apply" },
  { id: "this-week", label: "This Week", icon: "📅", note: "Priority scheduling" },
  { id: "this-month", label: "This Month", icon: "🗓️", note: "Standard scheduling" },
  { id: "planning", label: "Just Planning Ahead", icon: "💡", note: "Best availability" },
];

function fmt(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

const BRAND_TIERS = [
  { id: "goodman", name: "Standard (Goodman)", desc: "Reliable, value-focused, industry-standard efficiency. Great for rentals.", mult: 1.0, tag: "Value Option" },
  { id: "bryant", name: "Comfort (Bryant)", desc: "Quieter, high-efficiency. Excellent balance of performance and upfront cost.", mult: 1.25, tag: "Most Popular" },
  { id: "trane", name: "Premium (Trane)", desc: "Industry-leading efficiency, variable-speed comfort, ultra-durable build.", mult: 1.5, tag: "Premium Tier" },
];

const SEVERITY_LEVELS = [
  { id: "minor", name: "Minor Fix", desc: "Capacitors, sensor clean, basic wiring, or simple thermostat swaps.", mult: 0.8, tag: "Light Work" },
  { id: "moderate", name: "Moderate Repair", desc: "Blower motor, fan coil, leak repair, TXV valve, or control boards.", mult: 1.5, tag: "Standard Repair" },
  { id: "major", name: "Major Overhaul", desc: "Compressor swap, evaporator coil, heat exchanger, or major leaks.", mult: 2.8, tag: "Complex Job" },
];

export function QuoteEstimator() {
  const [step, setStep] = useState(0);
  const [service, setService] = useState<string | null>(null);
  const [detailOption, setDetailOption] = useState<string | null>(null); // brand or severity id
  const [homeSize, setHomeSize] = useState<string | null>(null);
  const [urgency, setUrgency] = useState<string | null>(null);
  const [key, setKey] = useState(0);

  function advance() {
    setKey((k) => k + 1);
    setStep((s) => s + 1);
  }
  function reset() {
    setService(null);
    setDetailOption(null);
    setHomeSize(null);
    setUrgency(null);
    setStep(0);
    setKey((k) => k + 1);
  }

  const isInstall = service === "ac-install" || service === "furnace-install";
  const detailList = isInstall ? BRAND_TIERS : SEVERITY_LEVELS;
  const activeDetail = detailList.find((d) => d.id === detailOption);
  const detailMult = activeDetail ? activeDetail.mult : 1.0;

  const svc = SERVICES.find((s) => s.id === service);
  const range = svc && homeSize ? svc.ranges[homeSize] : null;
  const urgencyMult = urgency === "emergency" ? 1.25 : 1;

  // Calculate detailed items
  const baseLow = range ? range[0] * detailMult : 0;
  const baseHigh = range ? range[1] * detailMult : 0;

  const partsLow = Math.round(baseLow * 0.6);
  const partsHigh = Math.round(baseHigh * 0.6);

  const laborLow = Math.round(baseLow * 0.4 * urgencyMult);
  const laborHigh = Math.round(baseHigh * 0.4 * urgencyMult);

  const taxCredit = isInstall ? Math.min(Math.round(baseLow * 0.3), 2000) : 0;

  const totalLow = partsLow + laborLow;
  const totalHigh = partsHigh + laborHigh;

  const netLow = Math.max(totalLow - taxCredit, 0);
  const netHigh = Math.max(totalHigh - taxCredit, 0);

  const steps = ["Service", "Details", "Home Size", "Urgency", "Your Estimate"];

  function handleLockEstimate() {
    const serviceLabel = svc?.label || "HVAC Service";
    const detailLabel = activeDetail?.name || "";
    const sizeLabel = HOME_SIZES.find((h) => h.id === homeSize)?.label || "";
    const urgencyLabel = URGENCY.find((u) => u.id === urgency)?.label || "";

    const message = `Hello, I'd like to lock in my online estimate:\n- Service: ${serviceLabel}\n- Details: ${detailLabel}\n- Home Size: ${sizeLabel}\n- Urgency: ${urgencyLabel}\n- Estimated Range: ${fmt(netLow)} - ${fmt(netHigh)}`;

    // Dispatch custom event to fill ContactForm
    const event = new CustomEvent("populate-hvac-form", {
      detail: {
        message,
        service: serviceLabel,
      },
    });
    window.dispatchEvent(event);

    // Scroll to contact form
    const contactElem = document.getElementById("contact");
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <AnimatedSection id="quote" className="relative overflow-hidden bg-navy px-5 py-24 lg:px-8">
      {/* Background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 20% 50%, rgba(224,92,40,0.4) 0%, transparent 60%), radial-gradient(ellipse 50% 60% at 80% 30%, rgba(15,32,64,0.8) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          {/* Left — copy */}
          <div>
            <SectionHeading
              align="left"
              eyebrow="Instant Quote"
              title="Get Your Free"
              accentTitle="Cost Estimate"
              subtitle="Answer a few simple questions and get an instant ballpark estimate. No email required — zero pressure."
            />

            <div className="mt-8 grid gap-4">
              {[
                {
                  icon: Clock,
                  title: "Takes 45 seconds",
                  sub: "Just 4 simple questions",
                },
                {
                  icon: DollarSign,
                  title: "Detailed cost breakdown",
                  sub: "Transparent equipment & labor estimates",
                },
                {
                  icon: Shield,
                  title: "Zero obligation",
                  sub: "Auto-populate form to request site review",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange/15 border border-orange/25">
                      <Icon size={18} className="text-orange" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-white">{item.title}</p>
                      <p className="text-xs text-white/50">{item.sub}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Disclaimer */}
            <p className="mt-8 text-xs leading-5 text-white/35">
              * Estimates are ballpark figures based on typical Florida market rates. Actual pricing
              depends on your specific system, parts needed, and job complexity. A certified
              technician will provide an exact quote on-site.
            </p>
          </div>

          {/* Right — estimator card */}
          <div className="glass-card rounded-4xl p-1.5">
            <div className="rounded-[22px] bg-white p-6 md:p-8">
              {/* Progress bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  {steps.map((label, i) => (
                    <div key={label} className="flex items-center gap-1">
                      <div
                        className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-black transition-all duration-300 ${
                          i < step
                            ? "bg-green-500 text-white"
                            : i === step
                            ? "bg-orange-gradient text-white shadow-glow-sm"
                            : "bg-grey text-muted"
                        }`}
                      >
                        {i < step ? "✓" : i + 1}
                      </div>
                      {i < steps.length - 1 && (
                        <div
                          className={`hidden sm:block h-px flex-1 w-8 mx-1 transition-all duration-500 ${
                            i < step ? "bg-green-400" : "bg-slate-200"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-xs font-semibold text-muted">
                  Step {Math.min(step + 1, 5)} of 5 — {steps[Math.min(step, 4)]}
                </p>
              </div>

              {/* Steps */}
              <div key={key} className="animate-step-in">
                {/* Step 0 — Service */}
                {step === 0 && (
                  <div>
                    <p className="mb-4 text-base font-black text-navy">What do you need help with?</p>
                    <div className="grid grid-cols-2 gap-2.5">
                      {SERVICES.map((svc) => {
                        const Icon = svc.icon;
                        return (
                          <button
                            key={svc.id}
                            onClick={() => {
                              setService(svc.id);
                              advance();
                            }}
                            className={`group flex items-center gap-2.5 rounded-2xl border p-3.5 text-left transition-all duration-200 hover:border-orange/40 hover:bg-orange/5 hover:scale-[1.02] active:scale-[0.98] ${
                              service === svc.id
                                ? "border-orange bg-orange/8 shadow-glow-sm"
                                : "border-slate-200 bg-white"
                            }`}
                          >
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange/10 transition-colors group-hover:bg-orange/15">
                              <Icon size={18} className="text-orange" />
                            </div>
                            <span className="text-xs font-black text-navy leading-tight">{svc.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Step 1 — Details (Brand / Severity) */}
                {step === 1 && (
                  <div>
                    <p className="mb-4 text-base font-black text-navy">
                      {isInstall ? "Choose equipment tier preference:" : "Select service severity:"}
                    </p>
                    <div className="grid gap-2">
                      {detailList.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => {
                            setDetailOption(option.id);
                            advance();
                          }}
                          className="group relative flex items-start gap-4 rounded-2xl border border-slate-200 p-4 text-left transition-all hover:border-orange/40 hover:bg-orange/5 hover:scale-[1.01] active:scale-[0.99]"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-black text-navy">{option.name}</p>
                              <span className="rounded-full bg-orange/10 px-2 py-0.5 text-[9px] font-black text-orange">
                                {option.tag}
                              </span>
                            </div>
                            <p className="text-xs text-muted mt-1 leading-normal">{option.desc}</p>
                          </div>
                          <ChevronRight size={16} className="text-muted mt-1" />
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => { setStep(0); setKey((k) => k + 1); }}
                      className="mt-4 text-xs font-semibold text-muted hover:text-navy"
                    >
                      ← Back
                    </button>
                  </div>
                )}

                {/* Step 2 — Home Size */}
                {step === 2 && (
                  <div>
                    <p className="mb-4 text-base font-black text-navy">What&apos;s your home size?</p>
                    <div className="grid gap-2">
                      {HOME_SIZES.map((size) => (
                        <button
                          key={size.id}
                          onClick={() => {
                            setHomeSize(size.id);
                            advance();
                          }}
                          className="flex items-center justify-between rounded-2xl border border-slate-200 p-3.5 text-left transition-all hover:border-orange/40 hover:bg-orange/5 hover:scale-[1.01] active:scale-[0.99]"
                        >
                          <div>
                            <p className="text-sm font-black text-navy">{size.label}</p>
                            <p className="text-xs text-muted">{size.sub}</p>
                          </div>
                          <ChevronRight size={16} className="text-muted" />
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => { setStep(1); setKey((k) => k + 1); }}
                      className="mt-4 text-xs font-semibold text-muted hover:text-navy"
                    >
                      ← Back
                    </button>
                  </div>
                )}

                {/* Step 3 — Urgency */}
                {step === 3 && (
                  <div>
                    <p className="mb-4 text-base font-black text-navy">How urgent is this?</p>
                    <div className="grid gap-2.5">
                      {URGENCY.map((u) => (
                        <button
                          key={u.id}
                          onClick={() => {
                            setUrgency(u.id);
                            advance();
                          }}
                          className="flex items-center gap-4 rounded-2xl border border-slate-200 p-4 text-left transition-all hover:border-orange/40 hover:bg-orange/5 hover:scale-[1.01] active:scale-[0.99]"
                        >
                          <span className="text-2xl">{u.icon}</span>
                          <div>
                            <p className="text-sm font-black text-navy">{u.label}</p>
                            <p className="text-xs text-muted">{u.note}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => { setStep(2); setKey((k) => k + 1); }}
                      className="mt-4 text-xs font-semibold text-muted hover:text-navy"
                    >
                      ← Back
                    </button>
                  </div>
                )}

                {/* Step 4 — Result (Upgraded Detailed Estimate) */}
                {step === 4 && range && (
                  <div className="text-left animate-fade-in">
                    <div className="text-center mb-6">
                      <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-green-50 border border-green-200">
                        <CheckCircle2 size={26} className="text-green-500" />
                      </div>
                      <p className="text-xs font-bold text-muted uppercase tracking-wider mb-1">
                        Estimated Cost Summary
                      </p>
                      <h4 className="text-sm font-black text-navy leading-snug">
                        {svc?.label} — {activeDetail?.name}
                      </h4>
                    </div>

                    {/* Breakdown Card */}
                    <div className="rounded-2xl border border-slate-100 bg-grey/50 p-5 mb-5 space-y-3.5">
                      {/* Parts & Equipment */}
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-semibold text-muted">Equipment & Parts</span>
                        <span className="font-black text-navy">
                          {fmt(partsLow)} – {fmt(partsHigh)}
                        </span>
                      </div>

                      {/* Labor & Installation */}
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-semibold text-muted">Labor, Testing & Permits</span>
                        <span className="font-black text-navy">
                          {fmt(laborLow)} – {fmt(laborHigh)}
                        </span>
                      </div>

                      {/* Incentives / Tax Credits */}
                      {taxCredit > 0 && (
                        <div className="flex justify-between items-center text-sm text-green-600 bg-green-50 rounded-xl p-2.5 border border-green-100">
                          <span className="font-bold flex items-center gap-1">
                            🌱 Federal Tax Credit (25C)
                          </span>
                          <span className="font-black">-{fmt(taxCredit)}</span>
                        </div>
                      )}

                      <div className="h-px bg-slate-200" />

                      {/* Total Net Estimate */}
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-xs font-black uppercase text-orange tracking-wider">
                            Estimated Net Range
                          </span>
                          <p className="text-[10px] text-muted">After eligible tax credits</p>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-black text-orange">
                            {fmt(netLow)} – {fmt(netHigh)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Urgency warning */}
                    {urgency === "emergency" && (
                      <div className="mb-5 inline-flex w-full items-center gap-2 rounded-xl bg-red-50 border border-red-200 p-2.5 text-xs font-bold text-red-600">
                        <span>🚨</span>
                        <span>Emergency dispatch & priority same-day fee included.</span>
                      </div>
                    )}

                    {/* What's Included */}
                    <div className="mb-6">
                      <p className="text-[10.5px] font-black uppercase text-navy tracking-wider mb-2.5">
                        What&apos;s Included in Estimate:
                      </p>
                      <ul className="grid grid-cols-2 gap-2 text-xs text-navy font-semibold">
                        <li className="flex items-center gap-1.5">
                          <CheckCircle2 size={13} className="text-green-500 shrink-0" />
                          Old system recycling
                        </li>
                        <li className="flex items-center gap-1.5">
                          <CheckCircle2 size={13} className="text-green-500 shrink-0" />
                          EPA recovery compliance
                        </li>
                        <li className="flex items-center gap-1.5">
                          <CheckCircle2 size={13} className="text-green-500 shrink-0" />
                          10-Yr parts warranty
                        </li>
                        <li className="flex items-center gap-1.5">
                          <CheckCircle2 size={13} className="text-green-500 shrink-0" />
                          Air balance tuning
                        </li>
                      </ul>
                    </div>

                    {/* Actions */}
                    <div className="grid gap-3">
                      <button
                        onClick={handleLockEstimate}
                        className="flex items-center justify-center gap-2 rounded-full bg-orange-gradient px-6 py-4 text-sm font-black text-white shadow-glow transition hover:shadow-[0_0_50px_rgba(224,92,40,0.5)] hover:scale-[1.01] active:scale-[0.99]"
                      >
                        <Phone size={16} />
                        Lock In This Estimate & Book
                      </button>
                      <button
                        onClick={reset}
                        className="rounded-full border border-slate-200 py-3 text-sm font-semibold text-muted hover:bg-grey hover:text-navy transition"
                      >
                        Start a new estimate →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   3. SAVINGS CALCULATOR
   ───────────────────────────────────────────────────────────────────── */
export function SavingsCalculator() {
  const [age, setAge] = useState(15);
  const [bill, setBill] = useState(200);

  // A system >15 years old loses ~40% efficiency vs a new 18 SEER system
  const efficiencyLoss = Math.min(age * 2.5, 45); // up to 45%
  const monthlySavings = Math.round(bill * (efficiencyLoss / 100));
  const yearlySavings = monthlySavings * 12;
  const tenYearSavings = yearlySavings * 10;

  return (
    <AnimatedSection className="px-5 py-24 lg:px-8 bg-grey/40">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Energy Savings"
              title="How Much Could a"
              accentTitle="New System Save You?"
              subtitle="Old systems waste energy every month. See how much you're leaving on the table with an outdated unit."
            />
            <div className="mt-8 space-y-6">
              {/* System age slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-black text-navy">Current System Age</label>
                  <span className="rounded-full bg-orange/10 px-3 py-1 text-sm font-black text-orange">
                    {age} years old
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={25}
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #E05C28 0%, #E05C28 ${((age - 1) / 24) * 100}%, #e5e7eb ${((age - 1) / 24) * 100}%, #e5e7eb 100%)`,
                  }}
                />
                <div className="flex justify-between text-xs text-muted mt-1">
                  <span>1 yr</span><span>25 yrs</span>
                </div>
              </div>

              {/* Monthly bill slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-black text-navy">Average Monthly Electric Bill</label>
                  <span className="rounded-full bg-navy/8 px-3 py-1 text-sm font-black text-navy">
                    ${bill}
                  </span>
                </div>
                <input
                  type="range"
                  min={80}
                  max={600}
                  step={10}
                  value={bill}
                  onChange={(e) => setBill(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #0A1628 0%, #0A1628 ${((bill - 80) / 520) * 100}%, #e5e7eb ${((bill - 80) / 520) * 100}%, #e5e7eb 100%)`,
                  }}
                />
                <div className="flex justify-between text-xs text-muted mt-1">
                  <span>$80</span><span>$600</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results panel */}
          <div className="rounded-4xl border border-slate-100 bg-white p-8 shadow-card">
            <p className="text-xs font-black uppercase tracking-wider text-muted mb-6">
              Estimated Savings with a New System
            </p>

            <div className="space-y-4">
              {[
                { label: "Monthly savings", value: `$${monthlySavings}`, color: "text-navy", bg: "bg-grey/60" },
                { label: "Annual savings", value: `$${yearlySavings.toLocaleString()}`, color: "gradient-text", bg: "bg-orange/5 border border-orange/15" },
                { label: "10-year total savings", value: `$${tenYearSavings.toLocaleString()}`, color: "text-green-600", bg: "bg-green-50 border border-green-200" },
              ].map((item) => (
                <div key={item.label} className={`flex items-center justify-between rounded-2xl ${item.bg} p-4`}>
                  <div className="flex items-center gap-2">
                    <TrendingDown size={18} className="text-muted" />
                    <span className="text-sm font-semibold text-muted">{item.label}</span>
                  </div>
                  <span className={`text-2xl font-black ${item.color}`}>{item.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl bg-orange/8 border border-orange/20 p-4">
              <p className="text-xs font-bold text-navy leading-5">
                💡 A {age}-year-old system operates at roughly{" "}
                <strong>{Math.round(100 - efficiencyLoss)}% efficiency</strong>. A new high-efficiency
                system could cut HVAC-related energy costs by up to <strong>{Math.round(efficiencyLoss)}%</strong>.
              </p>
            </div>

            <ButtonLink href="#quote" className="mt-6 w-full" size="lg">
              Get My Free Estimate <ArrowRight size={16} />
            </ButtonLink>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   4. MAINTENANCE PLANS
   ───────────────────────────────────────────────────────────────────── */
const plans = [
  {
    name: "Basic",
    price: 9,
    period: "mo",
    tagline: "Annual tune-up protection",
    color: "border-slate-200",
    badge: null,
    features: [
      "1 annual system tune-up",
      "15% discount on repairs",
      "Priority scheduling",
      "Filter replacement reminder",
    ],
    cta: "Get Basic",
    ctaVariant: "ghost" as const,
  },
  {
    name: "Comfort",
    price: 19,
    period: "mo",
    tagline: "Most popular for families",
    color: "border-orange/40 shadow-glow",
    badge: "Most Popular",
    features: [
      "2 tune-ups per year",
      "25% discount on repairs",
      "Priority same-day scheduling",
      "Free filter delivery (4x/yr)",
      "No after-hours fees",
      "Thermostat check included",
    ],
    cta: "Get Comfort Plan",
    ctaVariant: "primary" as const,
  },
  {
    name: "Elite",
    price: 34,
    period: "mo",
    tagline: "Complete peace of mind",
    color: "border-navy/30",
    badge: null,
    features: [
      "4 visits per year",
      "30% discount on all repairs",
      "Emergency service included",
      "Free filters (unlimited)",
      "No after-hours or trip fees",
      "Indoor air quality check",
      "Annual duct inspection",
    ],
    cta: "Get Elite Plan",
    ctaVariant: "dark" as const,
  },
];

export function MaintenancePlans() {
  return (
    <AnimatedSection className="px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Maintenance Plans"
          title="Protect Your System,"
          accentTitle="Save Every Month"
          subtitle="Regular maintenance extends system life by 40%, prevents 85% of breakdowns, and keeps your warranty valid."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative overflow-hidden rounded-4xl border-2 bg-white p-8 shadow-card flex flex-col ${plan.color} transition-all duration-300 hover:-translate-y-1 hover:shadow-hover`}
            >
              {plan.badge && (
                <div className="absolute top-4 right-4">
                  <span className="rounded-full bg-orange-gradient px-3 py-1 text-xs font-black text-white shadow-glow-sm">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div>
                <p className="text-sm font-black uppercase tracking-widest text-muted">{plan.name}</p>
                <div className="mt-3 flex items-end gap-1">
                  <span className="text-5xl font-black text-navy">${plan.price}</span>
                  <span className="mb-1.5 text-muted font-semibold">/{plan.period}</span>
                </div>
                <p className="mt-1 text-sm text-muted">{plan.tagline}</p>
              </div>

              <div className="my-6 h-px bg-slate-100" />

              <ul className="flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-navy">
                    <CheckCircle2 size={16} className="text-green-500 mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <ButtonLink
                  href="#contact"
                  variant={plan.ctaVariant}
                  className="w-full"
                  size="md"
                >
                  {plan.cta}
                </ButtonLink>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-muted">
          All plans include a 30-day satisfaction guarantee. Cancel any time with no penalty.
        </p>
      </div>
    </AnimatedSection>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   5. FAQ ACCORDION
   ───────────────────────────────────────────────────────────────────── */
const faqs = [
  {
    q: "How quickly can you come out for a repair?",
    a: "For emergencies, we aim to arrive within 2 hours of your call — 24/7, 365 days a year. For standard repairs, we offer same-day and next-day appointments in most cases. We'll always give you a clear arrival window.",
  },
  {
    q: "Do you give quotes before starting any work?",
    a: "Absolutely. Our technician will diagnose your system and provide a clear, written quote before a single wrench is turned. You approve the price — we never start work without your go-ahead. No surprises.",
  },
  {
    q: "What HVAC brands do you service?",
    a: "We service every major brand: Carrier, Trane, Lennox, Rheem, Goodman, York, Bryant, Daikin, Mitsubishi, and more. If it heats or cools, we fix it.",
  },
  {
    q: "Is my current system worth repairing or should I replace it?",
    a: "A good rule of thumb: if the repair cost exceeds 50% of the cost of a new system, or your unit is 12+ years old, replacement often makes more financial sense. Our technicians will give you an honest recommendation — we won't push a replacement if a repair will serve you well.",
  },
  {
    q: "How long does an AC or furnace installation take?",
    a: "Most residential system installations are completed in 4–8 hours. We handle all permits, disposal of the old unit, and test everything before we leave. You'll have a fully working system the same day in virtually all cases.",
  },
  {
    q: "Do you offer financing?",
    a: "Yes — we offer 0% financing plans on new system installations. Quick approval, flexible terms, and zero impact on your credit score just to check. Ask your technician or visit our financing page.",
  },
  {
    q: "Are your technicians licensed and insured?",
    a: "Every technician is NATE-certified, carries a valid Florida HVAC license, is fully insured, and has passed a background check. You'll always know who is coming to your home before they arrive.",
  },
  {
    q: "How often should I service my HVAC system?",
    a: "Twice a year is ideal — once before summer cooling season (spring) and once before winter heating season (fall). Regular tune-ups extend system life by 40%, prevent 85% of breakdowns, and keep your manufacturer warranty valid.",
  },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <AnimatedSection className="relative overflow-hidden bg-grey/40 px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <SectionHeading
              align="left"
              eyebrow="FAQ"
              title="Questions We"
              accentTitle="Hear Every Day"
              subtitle="Honest answers to everything homeowners ask before they call us."
            />
            <div className="mt-8 grid gap-3">
              {[
                { icon: ThumbsUp, text: "4,800+ satisfied jobs completed" },
                { icon: Star, text: "5.0 average Google rating" },
                { icon: BadgeCheck, text: "NATE Certified & BBB Accredited" },
                { icon: CalendarClock, text: "Same-day scheduling available" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.text} className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-orange/10">
                      <Icon size={16} className="text-orange" />
                    </div>
                    <span className="text-sm font-semibold text-navy">{item.text}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 rounded-3xl border border-orange/20 bg-white p-6 shadow-card">
              <p className="text-sm font-black text-navy">Still have a question?</p>
              <p className="mt-1 text-sm text-muted">Call us — a real person answers every time.</p>
              <a
                href={siteConfig.phoneHref}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-orange-gradient px-5 py-2.5 text-sm font-black text-white shadow-glow-sm"
              >
                <Phone size={15} />
                {siteConfig.phone}
              </a>
            </div>
          </div>

          {/* Accordion */}
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`overflow-hidden rounded-3xl border bg-white shadow-sm transition-all duration-300 ${
                  open === i ? "border-orange/30 shadow-card" : "border-slate-100"
                }`}
              >
                <button
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                >
                  <span className="text-sm font-black text-navy leading-snug">{faq.q}</span>
                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                      open === i
                        ? "border-orange/30 bg-orange/10 rotate-180"
                        : "border-slate-200 bg-grey"
                    }`}
                  >
                    <ChevronDown size={14} className={open === i ? "text-orange" : "text-muted"} />
                  </div>
                </button>

                {open === i && (
                  <div className="animate-step-in border-t border-slate-100 px-5 pb-5 pt-4">
                    <p className="text-sm leading-7 text-muted">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   6. TRUST & CREDENTIAL STRIP
   ───────────────────────────────────────────────────────────────────── */
const credentials = [
  { icon: Clock, label: "Open 24 Hours", sub: "Emergency HVAC" },
  { icon: Shield, label: "Licensed & Insured", sub: siteConfig.county },
  { icon: MapPin, label: "Delray Beach, FL", sub: "Local contractor" },
  { icon: Percent, label: "0% Financing", sub: "On new systems" },
  { icon: Zap, label: "Same-Day Service", sub: "When available" },
  { icon: ThumbsUp, label: "Upfront Pricing", sub: "Before work starts" },
];

export function TrustStrip() {
  return (
    <section className="border-y border-slate-100 bg-white px-5 py-10 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">
          {credentials.map((cred) => {
            const Icon = cred.icon;
            return (
              <div
                key={cred.label}
                className="flex flex-col items-center gap-2 text-center group"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange/8 border border-orange/15 transition-all duration-300 group-hover:bg-orange-gradient group-hover:border-transparent group-hover:shadow-glow-sm">
                  <Icon size={22} className="text-orange transition-colors group-hover:text-white" />
                </div>
                <p className="text-xs font-black text-navy">{cred.label}</p>
                <p className="text-[10px] text-muted">{cred.sub}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   7. RECENT JOBS GALLERY
   ───────────────────────────────────────────────────────────────────── */
const galleryJobs = [
  {
    title: "Trane 5-Ton AC Installation",
    location: "Delray Beach, FL",
    category: "ac-install",
    categoryLabel: "AC Installation",
    image: "/images/gallery-ac-install.webp",
    description: "Replaced an aging, inefficient 10 SEER condenser unit with a high-efficiency Trane 5-Ton 18 SEER cooling system. The project involved laying a new level composite pad, replacing the electrical disconnect box, and installing premium copper pipes with clean UV-resistant insulation jacket.",
  },
  {
    title: "Furnace Control Board & Tune-up",
    location: "Boca Raton, FL",
    category: "heating",
    categoryLabel: "Heating",
    image: "/images/gallery-furnace-service.webp",
    description: "Diagnosed a furnace short-cycling issue. Replaced a failing control board relays, cleaned the flame sensor, and tested gas valve pressure levels to ensure safe, efficient heating operation for the colder months.",
  },
  {
    title: "Attic Ductwork Replacement",
    location: "Boynton Beach, FL",
    category: "ductwork",
    categoryLabel: "Ductwork",
    image: "/images/gallery-duct-insulation.webp",
    description: "Installed completely new insulated silver-foil flexible ductwork and a galvanized supply plenum. Properly suspended all duct lines with durable support straps to maximize airflow distribution and eliminate attic heat gains.",
  },
  {
    title: "Commercial Rooftop Unit Maintenance",
    location: "West Palm Beach, FL",
    category: "maintenance",
    categoryLabel: "Maintenance",
    image: "/images/gallery-commercial-hvac.webp",
    description: "Performed quarterly PM servicing on a line of Carrier commercial package units on a retail building roof. Checked all refrigerant charges, tightened high-voltage electrical terminals, and thoroughly washed condenser coils.",
  },
  {
    title: "Smart Thermostat Installation",
    location: "Lake Worth Beach, FL",
    category: "maintenance",
    categoryLabel: "Maintenance",
    image: "/images/gallery-smart-thermostat.webp",
    description: "Installed a Google Nest Smart Thermostat on a central hallway wall. Calibrated temperature sensing, configured Wi-Fi remote access, and optimized scheduled heating/cooling modes for up to 15% monthly energy savings.",
  },
  {
    title: "Emergency AC Condenser Tune-up",
    location: "Wellington, FL",
    category: "ac-install",
    categoryLabel: "AC Installation",
    image: "/images/gallery-compressor-tuneup.webp",
    description: "Dispatched for a cooling system failure in midday heat. Checked operating pressures with digital manifold gauges, replaced a blown dual-run capacitor, washed down clogged condenser fins, and restored full cooling.",
  },
];

const categories = [
  { id: "all", label: "All Projects" },
  { id: "ac-install", label: "AC Installation" },
  { id: "heating", label: "Heating" },
  { id: "ductwork", label: "Ductwork" },
  { id: "maintenance", label: "Maintenance" },
];

export function RecentJobsGallery() {
  const [filter, setFilter] = useState("all");
  const [activeJob, setActiveJob] = useState<typeof galleryJobs[0] | null>(null);

  const filteredJobs = filter === "all"
    ? galleryJobs
    : galleryJobs.filter((job) => job.category === filter);

  return (
    <AnimatedSection id="gallery" className="px-5 py-24 lg:px-8 bg-white">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Recent Work"
          title="Recent Jobs"
          accentTitle="Gallery"
          subtitle="Real installations, repairs, and maintenance work completed by our team. Click any image to enlarge."
        />

        {/* Filter Tabs */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`rounded-full px-5 py-2.5 text-xs font-black transition-all duration-200 ${
                filter === cat.id
                  ? "bg-orange-gradient text-white shadow-glow-sm"
                  : "bg-grey text-navy hover:bg-slate-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job) => (
            <div
              key={job.title}
              onClick={() => setActiveJob(job)}
              className="group relative cursor-pointer overflow-hidden rounded-3xl border border-slate-100 bg-grey shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-hover"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={job.image}
                  alt={job.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Dark Hover Overlay */}
                <div className="absolute inset-0 bg-[#07101f]/60 opacity-0 backdrop-blur-[2px] transition-all duration-300 group-hover:opacity-100 flex items-center justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 border border-white/30 backdrop-blur-md text-white shadow-glow-sm transition-transform duration-300 scale-90 group-hover:scale-100">
                    <Maximize2 size={20} />
                  </div>
                </div>
              </div>

              {/* Text info */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="rounded-full bg-orange/10 px-3 py-1 text-[10px] font-black text-orange">
                    {job.categoryLabel}
                  </span>
                  <span className="text-[10px] font-semibold text-muted">{job.location}</span>
                </div>
                <h3 className="text-base font-black text-navy leading-snug group-hover:text-orange transition-colors">
                  {job.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal (Click to Enlarge) */}
      {activeJob && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in"
          onClick={() => setActiveJob(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveJob(null)}
              className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/85 transition-all duration-200 z-10 hover:scale-105"
            >
              <X size={20} />
            </button>

            <div className="grid md:grid-cols-2">
              {/* Left Column: Image */}
              <div className="relative aspect-[4/3] md:aspect-auto md:h-[500px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeJob.image}
                  alt={activeJob.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right Column: Copy & CTAs */}
              <div className="p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-4">
                    <span className="rounded-full bg-orange/10 px-3 py-1 text-xs font-black text-orange">
                      {activeJob.categoryLabel}
                    </span>
                    <span className="text-xs text-muted font-bold">{activeJob.location}</span>
                  </div>
                  <h3 className="text-2xl font-black text-navy mb-4 leading-tight">
                    {activeJob.title}
                  </h3>
                  <p className="text-sm leading-7 text-muted mb-6">
                    {activeJob.description}
                  </p>
                </div>

                <div className="grid gap-3">
                  <a
                    href={siteConfig.phoneHref}
                    className="flex items-center justify-center gap-2 rounded-full bg-orange-gradient py-4 text-sm font-black text-white shadow-glow transition hover:shadow-[0_0_50px_rgba(224,92,40,0.5)]"
                  >
                    <Phone size={16} />
                    Inquire About This Service
                  </a>
                  <button
                    onClick={() => setActiveJob(null)}
                    className="rounded-full border border-slate-200 py-3 text-sm font-bold text-navy hover:bg-grey transition"
                  >
                    Close Gallery
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AnimatedSection>
  );
}
