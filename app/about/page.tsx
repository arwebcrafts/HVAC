import type { Metadata } from "next";
import { CheckCircle2, Clock, MapPin, Phone } from "lucide-react";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${siteConfig.name}, a 24/7 HVAC contractor serving Delray Beach and Palm Beach County.`,
};

export default function AboutPage() {
  return (
    <section className="px-5 py-32 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeading
          align="left"
          eyebrow="About us"
          title="Local HVAC service built around fast response and clear communication"
          subtitle={`${siteConfig.name} is a Delray Beach HVAC contractor serving ${siteConfig.serviceAreaLabel}. We focus on AC repair, installation, maintenance, and emergency cooling calls.`}
        />
        <div className="rounded-[2rem] bg-grey p-8">
          <div className="grid gap-5">
            {[
              "Open 24 hours for HVAC emergencies",
              "Serving Delray Beach and Palm Beach County",
              "Residential and commercial cooling service",
              "Clear pricing before work begins",
            ].map((item) => (
              <div key={item} className="flex gap-3">
                <CheckCircle2 className="mt-1 shrink-0 text-orange" size={22} />
                <p className="font-bold text-navy">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 rounded-2xl bg-white p-5 shadow-card">
            <div className="flex items-center gap-3 text-sm font-semibold text-navy">
              <MapPin size={18} className="text-orange" />
              {siteConfig.address.street}, {siteConfig.address.city}, {siteConfig.address.state}{" "}
              {siteConfig.address.zip}
            </div>
            <div className="flex items-center gap-3 text-sm font-semibold text-navy">
              <Phone size={18} className="text-orange" />
              {siteConfig.phone}
            </div>
            <div className="flex items-center gap-3 text-sm font-semibold text-navy">
              <Clock size={18} className="text-orange" />
              Open 24 hours
            </div>
          </div>

          <ButtonLink href="/contact" className="mt-8">
            Schedule Service
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
