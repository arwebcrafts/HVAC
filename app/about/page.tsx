import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Summit Air Heating & Cooling and our customer-first HVAC service model.",
};

export default function AboutPage() {
  return (
    <section className="px-5 py-32 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeading
          align="left"
          eyebrow="About us"
          title="A local HVAC brand built around speed, clarity, and clean work"
          subtitle={`${siteConfig.name} is a polished demo identity for HVAC companies that need a site customers can trust quickly.`}
        />
        <div className="rounded-[2rem] bg-grey p-8">
          <div className="grid gap-5">
            {[
              "Licensed and insured technicians",
              "Clear pricing before work begins",
              "Same-day service and emergency availability",
              "Professional replacement and maintenance workflows",
            ].map((item) => (
              <div key={item} className="flex gap-3">
                <CheckCircle2 className="mt-1 shrink-0 text-orange" size={22} />
                <p className="font-bold text-navy">{item}</p>
              </div>
            ))}
          </div>
          <ButtonLink href="/contact" className="mt-8">
            Schedule Service
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
