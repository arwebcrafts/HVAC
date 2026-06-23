import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "HVAC Services",
  description:
    "Explore AC repair, AC installation, furnace service, heat pumps, emergency HVAC, duct cleaning, and maintenance plans.",
};

export default function ServicesPage() {
  return (
    <section className="px-5 py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="HVAC services"
          title="Repair, replace, maintain, and breathe easier"
          subtitle="Every core HVAC service has its own conversion-focused page for stronger SEO and clearer customer journeys."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group rounded-[2rem] border border-slate-200 bg-white p-7 shadow-card transition hover:-translate-y-1 hover:shadow-hover"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange/10 text-orange">
                  <Icon size={28} />
                </div>
                <p className="mt-6 text-sm font-black uppercase tracking-[0.2em] text-orange">
                  {service.eyebrow}
                </p>
                <h2 className="mt-3 text-2xl font-black text-navy">{service.title}</h2>
                <p className="mt-3 leading-7 text-muted">{service.longDescription}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-black text-orange">
                  View service <ArrowRight size={16} />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
