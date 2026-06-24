"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  User,
  Phone as PhoneIcon,
  Mail,
  Home,
  MapPin,
  Wrench,
  AlertTriangle,
  Clock,
  Info,
  Calendar,
  Send,
  Upload,
  CheckCircle2,
  X,
  Database,
  RefreshCw,
  Bell,
  MessageSquare,
  FileText,
  CreditCard,
  Star,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";

import { siteConfig } from "@/lib/site-config";

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

// --- LOG SYSTEM FOR CRM SIMULATOR ---
type LogEntry = {
  time: string;
  type: "info" | "success" | "warn" | "sms" | "email";
  text: string;
};

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

  // CRM Simulator State
  const [crmStage, setCrmStage] = useState("Idle");
  const [crmContact, setCrmContact] = useState<any>(null);
  const [crmOpportunity, setCrmOpportunity] = useState<any>(null);
  const [crmLogs, setCrmLogs] = useState<LogEntry[]>([]);
  const [crmActiveTab, setCrmActiveTab] = useState<"logs" | "followups" | "actions">("logs");
  
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Photo handlers
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const filesArr = Array.from(e.target.files);
      setPhotos((prev) => [...prev, ...filesArr]);
      
      const newPreviews = filesArr.map(f => URL.createObjectURL(f));
      setPhotoPreviews((prev) => [...prev, ...newPreviews]);
      
      addLog(`User selected ${filesArr.length} photo(s) for upload.`, "info");
    }
  }

  function removePhoto(index: number) {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
    setPhotoPreviews((prev) => prev.filter((_, i) => i !== index));
    addLog("User removed photo slot.", "info");
  }

  // Logger helper
  function addLog(text: string, type: LogEntry["type"] = "info") {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setCrmLogs((prev) => [...prev, { time, type, text }]);
  }

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [crmLogs]);

  // Initial Simulator State
  useEffect(() => {
    addLog("GHL/HubSpot automation webhook initialized.", "info");
    addLog("Pipeline configured: 'Residential & Light Commercial HVAC Sales'.", "info");
  }, []);

  // Update CRM logs based on keystrokes/selections (qualifying indicators)
  useEffect(() => {
    if (name) {
      const firstName = name.split(" ")[0];
      const serviceLabel = getServiceLabel(serviceType);
      setCrmContact({ name, phone, email, propertyType, street, zip });
      setCrmOpportunity({
        title: `${firstName} - ${serviceLabel}`,
        stage: "Quote Needed",
        urgency,
      });
    }
  }, [name, phone, email, propertyType, serviceType, urgency, street, zip]);

  function getServiceLabel(key: string) {
    switch (key) {
      case "not-cooling": return "AC Not Cooling";
      case "heating-issue": return "Heating Issue";
      case "noisy-unit": return "Noise / Smell Diagnostic";
      case "maintenance": return "Maintenance Tune-up";
      case "new-system": return "System Replacement";
      case "air-quality": return "IAQ Service";
      default: return "HVAC Diagnostic";
    }
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
      addLog(`Progressed to Step ${step + 1}.`, "info");
      setStep((prev) => prev + 1);
    }
  }

  function handleBack() {
    addLog(`Returned to Step ${step - 1}.`, "info");
    setStep((prev) => prev - 1);
  }

  // Form Submit
  const [calculatedQuoteData, setCalculatedQuoteData] = useState<QuoteResult | null>(null);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateStep(4)) return;

    const firstName = name.split(" ")[0];
    const serviceLabel = getServiceLabel(serviceType);
    const quote = calculateQuote(serviceType, propertyType);
    setCalculatedQuoteData(quote);

    setSubmitted(true);
    setCrmStage("Quote Needed");
    addLog("Form submitted successfully! Triggering automation workflow...", "success");

    // Simulated Workflow Timelines
    setTimeout(() => {
      addLog(`[1. Create Contact] Contact created: "${name}" (${email})`, "success");
    }, 400);

    setTimeout(() => {
      addLog(`[2. Create Opportunity] Pipeline: "HVAC Pipeline", Stage: "Quote Needed", Opp: "${firstName} - ${serviceLabel}"`, "success");
    }, 800);

    setTimeout(() => {
      addLog(`[3. Add Contact Tags] Tagged: "HVAC-Quote", "${quote.tag}"`, "info");
    }, 1200);

    setTimeout(() => {
      addLog(`[4. Internal Notification] Alert sent to office: "New ${serviceLabel} lead. Urgency: ${urgency.toUpperCase()}. Address: ${street || "None"}"`, "warn");
    }, 1600);

    setTimeout(() => {
      addLog(`[5. Customer Dispatch SMS] Sent SMS to ${phone}: "Hi ${firstName}, this is ${siteConfig.name}. Thanks for your quote request. We're reviewing it and will text details shortly."`, "sms");
    }, 2000);

    setTimeout(() => {
      if (quote.type === "simple") {
        addLog(`[6. Ballpark Quote Trigger] Simple match! Sent SMS/Email to ${firstName}: "Most standard ${quote.title} jobs run around ${quote.priceRange}. Book a confirmation visit here: http://booking.example/visit"`, "sms");
      } else {
        addLog(`[6. Manual Review Trigger] Complex system request. Sent SMS/Email to ${firstName}: "Thanks for the photos. For this replacement/commercial job, let's coordinate a quick call/visit. Book here: http://booking.example/walkthrough"`, "sms");
      }
    }, 2800);
  }

  // Simulated Interactions
  function simulateBooking() {
    const firstName = name.split(" ")[0];
    setCrmStage("Quote Visit Scheduled");
    addLog(`[Simulator Action] Customer booked appointment on calendar.`, "info");
    addLog(`[CRM Stage Update] Stage moved: "Quote Needed" ➔ "Quote Visit Scheduled"`, "success");
    addLog(`[Booking Confirmation SMS] Sent to ${phone}: "Appointment confirmed! A technician will arrive on your preferred window. View summary: http://booking.example/appt-details"`, "sms");
    addLog(`[Tech Alert] Notification dispatched to tech dispatch: "${name} scheduled for diagnostic walkthrough. Photos attached."`, "warn");
  }

  function simulateJobCompletion() {
    setCrmStage("Job Completed");
    addLog(`[Simulator Action] Job marked as COMPLETED by field technician.`, "info");
    addLog(`[Stripe Invoice Created] Sent SMS/Email to ${phone}: "Thanks for choosing us! You can view and pay your invoice securely here: http://invoice.example/pay-stripe"`, "success");
  }

  function simulatePayment() {
    setCrmStage("Paid");
    addLog(`[Simulator Action] Customer paid Stripe invoice.`, "success");
    addLog(`[Google Review Request] Dispatched auto-SMS to ${phone}: "One last favor: would you mind leaving us a quick Google review? It helps a local business like ours: http://review.example/google"`, "sms");
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
  }

  function simulateReset() {
    reset();
    setSubmitted(false);
    setCrmStage("Idle");
    setCrmContact(null);
    setCrmOpportunity(null);
    setCrmLogs([]);
    addLog("Simulator reset. Ready for new input.", "info");
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
            Qualify your service request, receive an instant ballpark estimate, and view how our CRM automation pipeline schedules your follow-ups.
          </p>
        </div>

        {/* Two-Column Workspace */}
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          
          {/* LEFT: Multi-Step Form */}
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

                  {/* Quick booking link simulation */}
                  <div className="mt-8 p-6 rounded-3xl border border-slate-100 bg-grey/50 max-w-lg mx-auto text-left">
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar size={18} className="text-orange" />
                      <h4 className="text-sm font-black text-navy">Schedule Your On-Site Review</h4>
                    </div>
                    <p className="text-xs text-muted leading-relaxed mb-4">
                      Book directly on our scheduler calendar to confirm diagnostic findings or complete mechanical system designs.
                    </p>
                    <button
                      onClick={simulateBooking}
                      disabled={crmStage !== "Quote Needed"}
                      className="w-full flex items-center justify-center gap-2 rounded-2xl bg-orange-gradient py-3.5 text-xs font-black text-white shadow-glow transition hover:shadow-orange/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                    >
                      <Calendar size={14} />
                      {crmStage === "Quote Needed" ? "Book Confirmation Appointment" : "Appointment Scheduled ✓"}
                    </button>
                  </div>

                  <div className="mt-8 flex justify-center gap-4">
                    <button
                      onClick={simulateReset}
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
                          <div className="relative">
                            <User className="absolute left-3.5 top-3.5 text-muted" size={16} />
                            <input
                              className="form-input pl-10"
                              placeholder="John Smith"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                          {errors.name && <span className="text-[10px] text-red-500 font-bold tracking-normal uppercase">{errors.name}</span>}
                        </label>

                        {/* Phone */}
                        <label className="grid gap-1.5 text-xs font-black text-navy uppercase tracking-wider">
                          Mobile Number *
                          <div className="relative">
                            <PhoneIcon className="absolute left-3.5 top-3.5 text-muted" size={16} />
                            <input
                              type="tel"
                              className="form-input pl-10"
                              placeholder="(555) 000-0000"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                            />
                          </div>
                          {errors.phone && <span className="text-[10px] text-red-500 font-bold tracking-normal uppercase">{errors.phone}</span>}
                        </label>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        {/* Email */}
                        <label className="grid gap-1.5 text-xs font-black text-navy uppercase tracking-wider">
                          Email Address *
                          <div className="relative">
                            <Mail className="absolute left-3.5 top-3.5 text-muted" size={16} />
                            <input
                              type="email"
                              className="form-input pl-10"
                              placeholder="john@example.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                          {errors.email && <span className="text-[10px] text-red-500 font-bold tracking-normal uppercase">{errors.email}</span>}
                        </label>

                        {/* Property Type */}
                        <label className="grid gap-1.5 text-xs font-black text-navy uppercase tracking-wider">
                          Property Type *
                          <div className="relative">
                            <Home className="absolute left-3.5 top-3.5 text-muted" size={16} />
                            <select
                              className="form-input pl-10"
                              value={propertyType}
                              onChange={(e) => setPropertyType(e.target.value)}
                            >
                              <option value="single-family">Single‑Family Home</option>
                              <option value="condo-apartment">Condo / Apartment</option>
                              <option value="duplex-townhouse">Townhouse / Duplex</option>
                              <option value="small-commercial">Small Commercial Space</option>
                            </select>
                          </div>
                        </label>
                      </div>

                      {/* Address */}
                      <div className="grid gap-4 md:grid-cols-[1.5fr_0.5fr]">
                        <label className="grid gap-1.5 text-xs font-black text-navy uppercase tracking-wider">
                          Street Address (Optional)
                          <div className="relative">
                            <MapPin className="absolute left-3.5 top-3.5 text-muted" size={16} />
                            <input
                              className="form-input pl-10"
                              placeholder="123 Comfort Lane"
                              value={street}
                              onChange={(e) => setStreet(e.target.value)}
                            />
                          </div>
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
                        <div className="relative">
                          <Wrench className="absolute left-3.5 top-3.5 text-muted" size={16} />
                          <select
                            className="form-input pl-10"
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
                        </div>
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
                              onClick={() => {
                                setUrgency(item.id);
                                addLog(`User updated urgency level to: ${item.label.toUpperCase()}`, "info");
                              }}
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
                                  className="absolute top-0.5 right-0.5 h-4.5 w-4.5 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-black/85"
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

          {/* RIGHT: Live CRM Automation Dashboard */}
          <div className="glass-card rounded-[2.5rem] p-1.5 shadow-glass border border-white/10 h-full">
            <div className="rounded-[2.2rem] bg-[#07101f]/90 p-5 md:p-6 text-white h-full flex flex-col justify-between min-h-[500px]">
              
              <div>
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Database className="text-orange" size={20} />
                    <div>
                      <h3 className="text-sm font-black tracking-wider uppercase text-white">
                        GHL / CRM Automation Engine
                      </h3>
                      <p className="text-[10px] text-white/50">Simulating workflow pipeline & actions</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`inline-block h-2 w-2 rounded-full ${crmStage === "Idle" ? "bg-slate-400 animate-pulse" : "bg-green-500 animate-ping"}`} />
                    <span className="text-[10px] font-black uppercase text-white/70">{crmStage}</span>
                  </div>
                </div>

                {/* Dashboard Tabs */}
                <div className="flex gap-1 bg-white/5 rounded-xl p-1 mb-4 text-xs font-bold">
                  {[
                    { id: "logs", label: "Real-time logs", icon: RefreshCw },
                    { id: "followups", label: "7-day followups", icon: MessageSquare },
                    { id: "actions", label: "CRM pipeline", icon: FileText },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setCrmActiveTab(tab.id as any)}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg transition-colors ${
                          crmActiveTab === tab.id
                            ? "bg-orange-gradient text-white"
                            : "text-white/60 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <Icon size={12} />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* TAB CONTENT: LOGS */}
                {crmActiveTab === "logs" && (
                  <div className="bg-black/40 rounded-2xl p-4 border border-white/5 font-mono text-[11px] leading-relaxed max-h-[340px] overflow-y-auto min-h-[220px]">
                    {crmLogs.length === 0 ? (
                      <p className="text-white/30 italic text-center py-10">
                        Logs will populate in real-time as you interact with the form.
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {crmLogs.map((log, idx) => (
                          <div key={idx} className="flex gap-2">
                            <span className="text-white/40 shrink-0">{log.time}</span>
                            <span className={
                              log.type === "success" ? "text-green-400 font-bold" :
                              log.type === "warn" ? "text-amber-400 font-bold" :
                              log.type === "sms" ? "text-sky-400 font-bold" :
                              log.type === "email" ? "text-pink-400 font-bold" : "text-white/70"
                            }>
                              {log.type === "sms" && "[SMS] "}
                              {log.type === "email" && "[EMAIL] "}
                              {log.text}
                            </span>
                          </div>
                        ))}
                        <div ref={logsEndRef} />
                      </div>
                    )}
                  </div>
                )}

                {/* TAB CONTENT: 7-DAY FOLLOW-UPS */}
                {crmActiveTab === "followups" && (
                  <div className="space-y-3 max-h-[340px] overflow-y-auto min-h-[220px] text-xs">
                    <p className="text-[10px] font-black uppercase text-orange tracking-wider">
                      Scheduled Follow-up Campaigns (7-Day Sequence)
                    </p>
                    <div className="grid gap-2.5">
                      {[
                        { day: "Day 1 Check-in", text: "SMS: 'Hi [First Name], just checking in — did you have any questions about our ballpark estimate for [Service Type]?'", delay: "24 hours after submit" },
                        { day: "Day 3 Booking reminder", text: "Email: 'We want to ensure we hold this price range for you. Book your confirmation visit here: [calendar_link]'", delay: "72 hours after submit" },
                        { day: "Day 7 Final reconnect", text: "SMS: 'We'll close out this quote soon, but if you still need help with [Service Type], reply YES and we'll connect you.'", delay: "168 hours after submit" },
                      ].map((seq, idx) => (
                        <div key={idx} className="border border-white/8 bg-white/5 rounded-2xl p-3 flex flex-col gap-1.5">
                          <div className="flex items-center justify-between font-bold text-white/95">
                            <span className="text-[11px] font-black text-orange uppercase tracking-wider">{seq.day}</span>
                            <span className="text-[9px] bg-white/10 px-2 py-0.5 rounded text-white/55">{seq.delay}</span>
                          </div>
                          <p className="text-[11px] leading-relaxed text-white/70 italic">&ldquo;{seq.text}&rdquo;</p>
                          <div className="flex items-center gap-1.5 mt-1">
                            <span className="inline-block h-1.5 w-1.5 rounded-full bg-slate-500 animate-pulse" />
                            <span className="text-[9px] text-white/40 uppercase tracking-widest font-black">
                              {submitted ? "Pending Trigger" : "Awaiting Form Submit"}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB CONTENT: CRM OPPORTUNITY DETAILS */}
                {crmActiveTab === "actions" && (
                  <div className="space-y-4 max-h-[340px] overflow-y-auto min-h-[220px] text-xs">
                    <div>
                      <p className="text-[10px] font-black uppercase text-orange tracking-wider mb-2">
                        Active Lead Contact Card
                      </p>
                      {crmContact ? (
                        <div className="border border-white/8 bg-white/5 rounded-2xl p-4 space-y-2.5 font-mono text-[11px]">
                          <div className="flex justify-between border-b border-white/5 pb-1.5">
                            <span className="text-white/40">NAME:</span>
                            <span className="font-bold text-white">{crmContact.name}</span>
                          </div>
                          <div className="flex justify-between border-b border-white/5 pb-1.5">
                            <span className="text-white/40">PHONE:</span>
                            <span className="font-bold text-sky-400">{crmContact.phone}</span>
                          </div>
                          <div className="flex justify-between border-b border-white/5 pb-1.5">
                            <span className="text-white/40">EMAIL:</span>
                            <span className="font-bold text-pink-400">{crmContact.email}</span>
                          </div>
                          <div className="flex justify-between border-b border-white/5 pb-1.5">
                            <span className="text-white/40">PROPERTY:</span>
                            <span className="font-bold text-white uppercase">{crmContact.propertyType}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/40">ADDRESS:</span>
                            <span className="font-bold text-white/70">{crmContact.street || "Not specified"}</span>
                          </div>
                        </div>
                      ) : (
                        <p className="text-white/30 italic py-4 text-center">Start filling the form to create Contact.</p>
                      )}
                    </div>

                    <div>
                      <p className="text-[10px] font-black uppercase text-orange tracking-wider mb-2">
                        Active Pipeline Opportunity
                      </p>
                      {crmOpportunity ? (
                        <div className="border border-white/8 bg-white/5 rounded-2xl p-4 space-y-2.5 font-mono text-[11px]">
                          <div className="flex justify-between border-b border-white/5 pb-1.5">
                            <span className="text-white/40">TITLE:</span>
                            <span className="font-bold text-white">{crmOpportunity.title}</span>
                          </div>
                          <div className="flex justify-between border-b border-white/5 pb-1.5">
                            <span className="text-white/40">STAGE:</span>
                            <span className="font-black text-green-400 uppercase">{crmStage}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/40">URGENCY:</span>
                            <span className="font-bold text-amber-400 uppercase">{crmOpportunity.urgency}</span>
                          </div>
                        </div>
                      ) : (
                        <p className="text-white/30 italic py-4 text-center">Opportunity card will populate on input.</p>
                      )}
                    </div>
                  </div>
                )}

              </div>

              {/* Action Buttons for pipeline state changes */}
              <div className="border-t border-white/10 pt-4 mt-6 space-y-2.5">
                <p className="text-[9.5px] font-black uppercase text-white/40 tracking-wider">
                  Admin Automation Override (Test pipeline lifecycle)
                </p>
                <div className="grid grid-cols-2 gap-2 text-[10px] font-black uppercase tracking-wider">
                  <button
                    onClick={simulateBooking}
                    disabled={!submitted || crmStage !== "Quote Needed"}
                    className="flex items-center justify-center gap-1.5 border border-white/10 rounded-xl py-2 hover:bg-white/5 disabled:opacity-40 disabled:hover:bg-transparent text-white transition"
                  >
                    <Calendar size={12} className="text-orange" />
                    Book Visit
                  </button>
                  <button
                    onClick={simulateJobCompletion}
                    disabled={!submitted || crmStage !== "Quote Visit Scheduled"}
                    className="flex items-center justify-center gap-1.5 border border-white/10 rounded-xl py-2 hover:bg-white/5 disabled:opacity-40 disabled:hover:bg-transparent text-white transition"
                  >
                    <CheckCircle2 size={12} className="text-green-500" />
                    Complete Job
                  </button>
                  <button
                    onClick={simulatePayment}
                    disabled={!submitted || crmStage !== "Job Completed"}
                    className="flex items-center justify-center gap-1.5 border border-white/10 rounded-xl py-2 hover:bg-white/5 disabled:opacity-40 disabled:hover:bg-transparent text-white transition"
                  >
                    <CreditCard size={12} className="text-sky-400" />
                    Pay Invoice
                  </button>
                  <button
                    onClick={simulateReset}
                    className="flex items-center justify-center gap-1.5 border border-white/10 rounded-xl py-2 hover:bg-white/5 text-white transition"
                  >
                    <RefreshCw size={12} className="text-white/55" />
                    Reset Flow
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
