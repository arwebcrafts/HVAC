"use client";

import React, { useState, useRef } from "react";
import {
  CheckCircle2,
  X,
  ChevronRight,
  ChevronLeft,
  Calendar,
  Send,
  Upload,
} from "lucide-react";

// --- QUOTING LOGIC ---
type QuoteResult = {
  type: "simple" | "complex";
  status: string;
  title: string;
  rangeText: string;
  tag: string;
  priceRange: string;
};

function calculateQuote(service: string, property: string): QuoteResult {
  const isCommercial = property === "small-commercial";
  const isComplex = service === "new-system" || isCommercial;

  if (isComplex) {
    return {
      type: "complex",
      status: "Manual Review Required",
      title: service === "new-system" ? "System Replacement Quote" : "Commercial Service Estimate",
      rangeText: service === "new-system"
        ? "New high-efficiency HVAC systems typically range from $4,800 to $8,500 installed, depending on size, brand, and SEER rating. Since system sizing is critical, we require a quick, free on-site walkthrough to confirm the exact price."
        : "Commercial properties require manual review of square footage, load calculations, and equipment specifications. A commercial project manager will review your submission and contact you directly.",
      tag: service === "new-system" ? "New-System" : "Commercial-Service",
      priceRange: "$4,800 - $8,500",
    };
  }

  if (service === "maintenance") {
    return {
      type: "simple",
      status: "Auto-Generated Ballpark",
      title: "System Maintenance & Tune-up",
      rangeText: "Standard system tune-ups and performance checks in your area are a flat rate of $99 per system. This includes filter check, coil inspection, and system performance test.",
      tag: "Maintenance-TuneUp",
      priceRange: "$99",
    };
  }

  // Diagnostic visit for repairs/noises
  let label = "HVAC Diagnostic Visit";
  if (service === "not-cooling") label = "AC Diagnostic Visit";
  if (service === "heating-issue") label = "Heating Diagnostic Visit";

  return {
    type: "simple",
    status: "Auto-Generated Ballpark",
    title: label,
    rangeText: "Most standard diagnostic visits (which include full inspection, failure diagnosis, and custom repair quote) are between $89 and $189 before parts. The tech will confirm exact repairs on-site.",
    tag: "AC-Repair",
    priceRange: "$89 - $189",
  };
}

export default function QuotePage() {
  const steps = [
    "Contact & Property",
    "Service & Urgency",
    "Equipment Info",
    "Timing & Consent"
  ];

  // Form Steps State
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [booked, setBooked] = useState(false);

  // Form Fields State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [propertyType, setPropertyType] = useState("single-family");
  const [street, setStreet] = useState("");
  const [zip, setZip] = useState("");

  const [serviceType, setServiceType] = useState("not-cooling");
  const [otherService, setOtherService] = useState("");
  const [urgency, setUrgency] = useState("soon");

  const [systemType, setSystemType] = useState("central-ac");
  const [systemAge, setSystemAge] = useState("5-10");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);

  const [preferredTime, setPreferredTime] = useState("any-time");
  const [quoteType, setQuoteType] = useState("ballpark");
  const [consent, setConsent] = useState(false);

  // Form Errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Photo handlers
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const filesArr = Array.from(e.target.files);
      setPhotos((prev) => [...prev, ...filesArr]);
      
      const newPreviews = filesArr.map(f => URL.createObjectURL(f));
      setPhotoPreviews((prev) => [...prev, ...newPreviews]);
    }
  }

  function removePhoto(index: number) {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
    setPhotoPreviews((prev) => prev.filter((_, i) => i !== index));
  }

  // Steps validation
  function validateStep(s: number) {
    const newErrors: Record<string, string> = {};
    if (s === 1) {
      if (!name.trim()) newErrors.name = "Full Name is required.";
      if (!phone.trim()) newErrors.phone = "Mobile Number is required.";
      else if (!/^\+?[\d\s-]{10,15}$/.test(phone.replace(/\D/g, ""))) {
        newErrors.phone = "Please enter a valid mobile number.";
      }
      if (!email.trim()) newErrors.email = "Email Address is required.";
      else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = "Please enter a valid email address.";
      }
    } else if (s === 4) {
      if (!consent) newErrors.consent = "You must agree to receive communications regarding this quote.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleNext() {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
    }
  }

  function handleBack() {
    setStep((prev) => prev - 1);
  }

  // Form Submit
  const [calculatedQuoteData, setCalculatedQuoteData] = useState<QuoteResult | null>(null);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateStep(4)) return;

    const quote = calculateQuote(serviceType, propertyType);
    setCalculatedQuoteData(quote);
    setSubmitted(true);
  }

  function reset() {
    setName("");
    setPhone("");
    setEmail("");
    setPropertyType("single-family");
    setStreet("");
    setZip("");
    setServiceType("not-cooling");
    setOtherService("");
    setUrgency("soon");
    setSystemType("central-ac");
    setSystemAge("5-10");
    setDescription("");
    setPhotos([]);
    setPhotoPreviews([]);
    setPreferredTime("any-time");
    setQuoteType("ballpark");
    setConsent(false);
    setStep(1);
    setErrors({});
    setSubmitted(false);
    setBooked(false);
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-navy px-5 pb-24 pt-32 text-white md:pt-40 lg:px-8">
      {/* Background orbs */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 20% 50%, rgba(224,92,40,0.45) 0%, transparent 65%), radial-gradient(ellipse 50% 60% at 80% 30%, rgba(15,32,64,0.85) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Title Heading */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <div className="inline-flex items-center gap-2 mx-auto">
            <span className="h-px w-6 bg-orange" />
            <p className="text-xs font-black uppercase tracking-[0.28em] text-orange">
              Online Quoting Portal
            </p>
            <span className="h-px w-6 bg-orange" />
          </div>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-white md:text-5xl lg:text-6xl leading-[1.1] text-balance">
            Request an <span className="gradient-text">HVAC Quote</span>
          </h1>
          <p className="mt-5 text-base md:text-lg leading-8 text-white/60 max-w-2xl mx-auto">
            Qualify your service request in minutes and receive an instant, accurate ballpark estimate tailored to your property.
          </p>
        </div>

        {/* Centered Form Workspace */}
        <div className="mx-auto max-w-2xl">
          <div className="glass-card rounded-[2.5rem] p-1.5 shadow-glass border border-white/10">
            <div className="rounded-[2.2rem] bg-white p-6 md:p-8 text-navy relative overflow-hidden">
              
              {/* Form header step indicator */}
              {!submitted && (
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    {steps.slice(0, 4).map((label, idx) => {
                      const num = idx + 1;
                      return (
                        <div key={label} className="flex items-center gap-1.5 flex-1 last:flex-initial">
                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-black transition-all duration-300 ${
                              num < step
                                ? "bg-green-500 text-white"
                                : num === step
                                ? "bg-orange-gradient text-white shadow-glow-sm"
                                : "bg-grey text-muted"
                            }`}
                          >
                            {num < step ? "✓" : num}
                          </div>
                          <span className="text-[10px] md:text-xs font-bold text-muted hidden md:inline">
                            {label}
                          </span>
                          {idx < 3 && (
                            <div
                              className={`h-px flex-1 mx-2 transition-all duration-500 ${
                                num < step ? "bg-green-400" : "bg-slate-200"
                              }`}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-xs font-black text-muted tracking-wider uppercase">
                    Step {step} of 4 — {steps[step - 1]}
                  </p>
                </div>
              )}

              {/* Form Content */}
              {submitted ? (
                // SUCCESS SCREEN
                <div className="text-center py-6 animate-fade-in">
                  <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-50 border border-green-200 shadow-sm animate-scale-in">
                    <CheckCircle2 size={42} className="text-green-500" />
                  </div>
                  <h2 className="text-3xl font-black text-navy leading-none">
                    Thanks, {name.split(" ")[0]}!
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-muted max-w-md mx-auto">
                    Our system is preparing your estimate. You will receive an immediate SMS text and email confirmation shortly.
                  </p>

                  {/* Calculated ballpark quote display */}
                  {calculatedQuoteData && (
                    <div className="mt-6 p-6 rounded-3xl border border-orange/20 bg-orange/5 text-left max-w-lg mx-auto">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="rounded-full bg-orange-gradient px-2.5 py-0.5 text-[10px] font-black text-white">
                          {calculatedQuoteData.status}
                        </span>
                        <span className="text-[10.5px] font-bold text-muted">Estimated Ballpark</span>
                      </div>
                      <h4 className="text-lg font-black text-navy">{calculatedQuoteData.title}</h4>
                      <p className="text-xs text-muted mt-1 leading-normal mb-3">
                        {calculatedQuoteData.rangeText}
                      </p>
                      <div className="h-px bg-slate-200/60 my-2" />
                      <div className="flex justify-between items-center mt-2.5">
                        <span className="text-xs font-black uppercase text-navy/70 tracking-wider">
                          Estimate Range:
                        </span>
                        <span className="text-2xl font-black gradient-text">
                          {calculatedQuoteData.priceRange}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Quick booking link */}
                  <div className="mt-8 p-6 rounded-3xl border border-slate-100 bg-grey/50 max-w-lg mx-auto text-left">
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar size={18} className="text-orange" />
                      <h4 className="text-sm font-black text-navy">Schedule Your On-Site Review</h4>
                    </div>
                    <p className="text-xs text-muted leading-relaxed mb-4">
                      Book directly on our scheduler calendar to confirm diagnostic findings or complete mechanical system designs.
                    </p>
                    <button
                      onClick={() => setBooked(true)}
                      disabled={booked}
                      className="w-full flex items-center justify-center gap-2 rounded-2xl bg-orange-gradient py-3.5 text-xs font-black text-white shadow-glow transition hover:shadow-orange/30 disabled:opacity-75 disabled:cursor-not-allowed disabled:shadow-none"
                    >
                      <Calendar size={14} />
                      {!booked ? "Book Confirmation Appointment" : "Appointment Scheduled ✓"}
                    </button>
                  </div>

                  <div className="mt-8 flex justify-center gap-4">
                    <button
                      onClick={reset}
                      className="text-xs font-bold text-orange hover:underline"
                    >
                      ← Request New Quote
                    </button>
                  </div>
                </div>
              ) : (
                // FORM STEPS
                <form onSubmit={onSubmit} className="space-y-6">
                  
                  {/* STEP 1: Contact & Property details */}
                  {step === 1 && (
                    <div className="space-y-4 animate-step-in">
                      <div className="grid gap-4 md:grid-cols-2">
                        {/* Name */}
                        <label className="grid gap-1.5 text-xs font-black text-navy uppercase tracking-wider">
                          Full Name *
                          <input
                            className="form-input"
                            placeholder="John Smith"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                          {errors.name && <span className="text-[10px] text-red-500 font-bold tracking-normal uppercase">{errors.name}</span>}
                        </label>

                        {/* Phone */}
                        <label className="grid gap-1.5 text-xs font-black text-navy uppercase tracking-wider">
                          Mobile Number *
                          <input
                            type="tel"
                            className="form-input"
                            placeholder="(561) 584-3940"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                          {errors.phone && <span className="text-[10px] text-red-500 font-bold tracking-normal uppercase">{errors.phone}</span>}
                        </label>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        {/* Email */}
                        <label className="grid gap-1.5 text-xs font-black text-navy uppercase tracking-wider">
                          Email Address *
                          <input
                            type="email"
                            className="form-input"
                            placeholder="john@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          {errors.email && <span className="text-[10px] text-red-500 font-bold tracking-normal uppercase">{errors.email}</span>}
                        </label>

                        {/* Property Type */}
                        <label className="grid gap-1.5 text-xs font-black text-navy uppercase tracking-wider">
                          Property Type *
                          <select
                            className="form-input"
                            value={propertyType}
                            onChange={(e) => setPropertyType(e.target.value)}
                          >
                            <option value="single-family">Single‑Family Home</option>
                            <option value="condo-apartment">Condo / Apartment</option>
                            <option value="duplex-townhouse">Townhouse / Duplex</option>
                            <option value="small-commercial">Small Commercial Space</option>
                          </select>
                        </label>
                      </div>

                      {/* Address */}
                      <div className="grid gap-4 md:grid-cols-[1.5fr_0.5fr]">
                        <label className="grid gap-1.5 text-xs font-black text-navy uppercase tracking-wider">
                          Street Address (Optional)
                          <input
                            className="form-input"
                            placeholder="123 Comfort Lane"
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                          />
                        </label>
                        <label className="grid gap-1.5 text-xs font-black text-navy uppercase tracking-wider">
                          ZIP / Postal
                          <input
                            className="form-input"
                            placeholder="32801"
                            value={zip}
                            onChange={(e) => setZip(e.target.value)}
                          />
                        </label>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: What do you need? */}
                  {step === 2 && (
                    <div className="space-y-4 animate-step-in">
                      {/* Service Type */}
                      <label className="grid gap-1.5 text-xs font-black text-navy uppercase tracking-wider">
                        Service Needed *
                        <select
                          className="form-input"
                          value={serviceType}
                          onChange={(e) => setServiceType(e.target.value)}
                        >
                          <option value="not-cooling">AC not cooling / no cold air</option>
                          <option value="heating-issue">Heating not working</option>
                          <option value="noisy-unit">Noisy unit / strange smells</option>
                          <option value="maintenance">Regular maintenance / tune‑up</option>
                          <option value="new-system">New system quote (replace old unit)</option>
                          <option value="air-quality">Indoor air quality (filters, duct cleaning)</option>
                          <option value="other">Other (specify details below)</option>
                        </select>
                      </label>

                      {serviceType === "other" && (
                        <label className="grid gap-1.5 text-xs font-black text-navy uppercase tracking-wider animate-fade-in">
                          Describe Service Required *
                          <input
                            className="form-input"
                            placeholder="e.g., thermostat replacement, fan issues"
                            value={otherService}
                            onChange={(e) => setOtherService(e.target.value)}
                          />
                        </label>
                      )}

                      {/* Urgency */}
                      <div>
                        <p className="text-xs font-black text-navy uppercase tracking-wider mb-2">Urgency Level *</p>
                        <div className="grid gap-2.5 sm:grid-cols-3">
                          {[
                            { id: "emergency", label: "Emergency", sub: "Today / 24 hrs", icon: "🚨" },
                            { id: "soon", label: "Soon", sub: "Next 2–3 days", icon: "📅" },
                            { id: "planning", label: "Planning Ahead", sub: "Later date", icon: "💡" },
                          ].map((item) => (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => setUrgency(item.id)}
                              className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border text-center transition-all ${
                                urgency === item.id
                                  ? "border-orange bg-orange/5 shadow-glow-sm"
                                  : "border-slate-200 hover:border-orange/20"
                              }`}
                            >
                              <span className="text-xl mb-1">{item.icon}</span>
                              <span className="text-xs font-black text-navy">{item.label}</span>
                              <span className="text-[10px] text-muted">{item.sub}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Equipment Info */}
                  {step === 3 && (
                    <div className="space-y-4 animate-step-in">
                      <div className="grid gap-4 md:grid-cols-2">
                        {/* System Type */}
                        <label className="grid gap-1.5 text-xs font-black text-navy uppercase tracking-wider">
                          System Type
                          <select
                            className="form-input"
                            value={systemType}
                            onChange={(e) => setSystemType(e.target.value)}
                          >
                            <option value="central-ac">Central AC</option>
                            <option value="heat-pump">Heat Pump</option>
                            <option value="gas-furnace">Gas Furnace</option>
                            <option value="mini-split">Mini‑Split (Ductless)</option>
                            <option value="not-sure">Not Sure</option>
                          </select>
                        </label>

                        {/* System Age */}
                        <label className="grid gap-1.5 text-xs font-black text-navy uppercase tracking-wider">
                          Approximate Age of System
                          <select
                            className="form-input"
                            value={systemAge}
                            onChange={(e) => setSystemAge(e.target.value)}
                          >
                            <option value="under-5">&lt; 5 years</option>
                            <option value="5-10">5–10 years</option>
                            <option value="10-15">10–15 years</option>
                            <option value="over-15">15+ years</option>
                            <option value="not-sure">Not Sure</option>
                          </select>
                        </label>
                      </div>

                      {/* Description */}
                      <label className="grid gap-1.5 text-xs font-black text-navy uppercase tracking-wider">
                        Description / Notes
                        <textarea
                          rows={3}
                          className="form-input resize-none"
                          placeholder="Tell us what's going on (noises, error codes, last time serviced, etc.)"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </label>

                      {/* Photo Upload Zone */}
                      <div>
                        <p className="text-xs font-black text-navy uppercase tracking-wider mb-2">
                          Upload Photos (Optional)
                        </p>
                        <div
                          onClick={() => fileInputRef.current?.click()}
                          className="border-2 border-dashed border-slate-200 hover:border-orange/30 rounded-2xl p-6 text-center cursor-pointer transition-colors bg-grey/30 flex flex-col items-center justify-center gap-2"
                        >
                          <Upload size={24} className="text-orange" />
                          <span className="text-xs font-bold text-navy">Drag files here or click to browse</span>
                          <span className="text-[10px] text-muted">Upload tags, equipment, label plate, or thermostat screens</span>
                        </div>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          ref={fileInputRef}
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />

                        {/* Photo Previews */}
                        {photoPreviews.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-2.5">
                            {photoPreviews.map((url, index) => (
                              <div key={url} className="relative h-14 w-14 rounded-xl overflow-hidden border shadow-sm">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={url} alt="upload preview" className="h-full w-full object-cover" />
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removePhoto(index);
                                  }}
                                  className="absolute top-0.5 right-0.5 h-4 w-4 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-black/85"
                                >
                                  <X size={10} />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* STEP 4: Timing & Delivery */}
                  {step === 4 && (
                    <div className="space-y-4 animate-step-in">
                      <div className="grid gap-4 md:grid-cols-2">
                        {/* Preferred Date/Time */}
                        <label className="grid gap-1.5 text-xs font-black text-navy uppercase tracking-wider">
                          Preferred Arrival Window
                          <select
                            className="form-input"
                            value={preferredTime}
                            onChange={(e) => setPreferredTime(e.target.value)}
                          >
                            <option value="mornings">Mornings (8:00 AM - 12:00 PM)</option>
                            <option value="afternoons">Afternoons (12:00 PM - 4:00 PM)</option>
                            <option value="evenings">Evenings (4:00 PM - 8:00 PM)</option>
                            <option value="any-time">Any Time Window</option>
                          </select>
                        </label>

                        {/* Quote Delivery Method */}
                        <div>
                          <p className="text-xs font-black text-navy uppercase tracking-wider mb-2">Quote Preference</p>
                          <div className="flex gap-4 mt-2">
                            <label className="flex items-center gap-2 text-xs font-black text-navy cursor-pointer">
                              <input
                                type="radio"
                                name="quoteType"
                                value="ballpark"
                                checked={quoteType === "ballpark"}
                                onChange={() => setQuoteType("ballpark")}
                                className="h-4 w-4 accent-orange"
                              />
                              Ballpark by SMS/Email
                            </label>
                            <label className="flex items-center gap-2 text-xs font-black text-navy cursor-pointer">
                              <input
                                type="radio"
                                name="quoteType"
                                value="call"
                                checked={quoteType === "call"}
                                onChange={() => setQuoteType("call")}
                                className="h-4 w-4 accent-orange"
                              />
                              Call Me
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Consent Checkbox */}
                      <label className="flex items-start gap-3 mt-4 text-xs font-semibold text-muted leading-relaxed cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={consent}
                          onChange={(e) => setConsent(e.target.checked)}
                          className="h-4 w-4 accent-orange mt-0.5 rounded cursor-pointer shrink-0"
                        />
                        <span>
                          I agree to receive automated calls, texts, and emails regarding my quote estimate. Msg & data rates may apply.
                        </span>
                      </label>
                      {errors.consent && (
                        <p className="text-[10px] text-red-500 font-bold uppercase tracking-normal">{errors.consent}</p>
                      )}
                    </div>
                  )}

                  {/* Form Action Buttons */}
                  <div className="flex items-center justify-between border-t border-slate-100 pt-5 mt-6">
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={handleBack}
                        className="flex items-center gap-1 text-xs font-black uppercase text-muted hover:text-navy transition"
                      >
                        <ChevronLeft size={16} />
                        Back
                      </button>
                    ) : (
                      <div />
                    )}

                    {step < 4 ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="flex items-center gap-1 rounded-full bg-orange-gradient px-6 py-3 text-xs font-black uppercase text-white shadow-glow transition hover:shadow-orange/30 hover:scale-[1.02] active:scale-[0.98]"
                      >
                        Next Step
                        <ChevronRight size={14} />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="flex items-center gap-2 rounded-full bg-orange-gradient px-8 py-3.5 text-xs font-black uppercase text-white shadow-glow transition hover:shadow-[0_0_50px_rgba(224,92,40,0.5)] hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <Send size={13} />
                        Submit Request & View Ballpark
                      </button>
                    )}
                  </div>

                </form>
              )}

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
