"use client";

import { Loader2, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { services } from "@/lib/services";

type FormValues = {
  name: string;
  phone: string;
  email: string;
  service: string;
  preferredDate?: string;
  message?: string;
};

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<FormValues>();

  useEffect(() => {
    function handlePopulate(e: any) {
      if (e.detail) {
        if (e.detail.message) {
          setValue("message", e.detail.message);
        }
        if (e.detail.service) {
          setValue("service", e.detail.service);
        }
      }
    }
    window.addEventListener("populate-hvac-form" as any, handlePopulate);
    return () => window.removeEventListener("populate-hvac-form" as any, handlePopulate);
  }, [setValue]);

  async function onSubmit() {
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSubmitted(true);
    reset();
  }

  if (submitted) {
    return (
      <div className="rounded-4xl border border-green-100 bg-white p-8 shadow-card text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
          <CheckCircle2 size={40} className="text-green-500" />
        </div>
        <h3 className="mt-5 text-2xl font-black text-navy">You&apos;re all set!</h3>
        <p className="mt-3 text-muted leading-7">
          We&apos;ve received your request and will contact you within 15 minutes.
          For emergencies, call us directly.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 text-sm font-bold text-orange hover:underline"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-4xl border border-slate-100 bg-white p-6 shadow-card md:p-8"
    >
      <h3 className="text-lg font-black text-navy mb-6">Book Your Appointment</h3>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Name */}
        <label className="grid gap-1.5 text-sm font-bold text-navy">
          Full Name *
          <input
            className="form-input"
            placeholder="John Smith"
            {...register("name", { required: true })}
          />
          {errors.name ? (
            <span className="text-xs font-semibold text-red-500">Name is required.</span>
          ) : null}
        </label>

        {/* Phone */}
        <label className="grid gap-1.5 text-sm font-bold text-navy">
          Phone Number *
          <input
            type="tel"
            className="form-input"
            placeholder="(561) 584-3940"
            {...register("phone", { required: true })}
          />
          {errors.phone ? (
            <span className="text-xs font-semibold text-red-500">Phone is required.</span>
          ) : null}
        </label>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {/* Email */}
        <label className="grid gap-1.5 text-sm font-bold text-navy">
          Email Address *
          <input
            type="email"
            className="form-input"
            placeholder="john@example.com"
            {...register("email", { required: true })}
          />
          {errors.email ? (
            <span className="text-xs font-semibold text-red-500">Email is required.</span>
          ) : null}
        </label>

        {/* Preferred Date */}
        <label className="grid gap-1.5 text-sm font-bold text-navy">
          Preferred Date
          <input
            type="date"
            className="form-input"
            {...register("preferredDate")}
          />
        </label>
      </div>

      {/* Service */}
      <label className="mt-4 grid gap-1.5 text-sm font-bold text-navy">
        Service Needed *
        <select
          className="form-input"
          {...register("service", { required: true })}
        >
          <option value="">Select a service…</option>
          {services.map((service) => (
            <option key={service.slug} value={service.title}>
              {service.title}
            </option>
          ))}
          <option value="Other">Other</option>
        </select>
        {errors.service ? (
          <span className="text-xs font-semibold text-red-500">Please select a service.</span>
        ) : null}
      </label>

      {/* Message */}
      <label className="mt-4 grid gap-1.5 text-sm font-bold text-navy">
        Message (optional)
        <textarea
          rows={4}
          className="form-input resize-none"
          placeholder="Describe the issue, your system type, or any questions…"
          {...register("message")}
        />
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-orange-gradient px-6 py-4 text-base font-black text-white shadow-glow transition-all duration-300 hover:shadow-[0_0_50px_rgba(224,92,40,0.5)] hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed border border-orange/20"
      >
        {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : null}
        {isSubmitting ? "Sending…" : "Book My Appointment Now"}
      </button>

      <p className="mt-4 text-xs leading-6 text-muted text-center">
        ✅ We respond within 15 minutes during business hours.
        Emergency calls answered 24/7.
      </p>
    </form>
  );
}
