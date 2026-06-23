import type { Metadata } from "next";
import { MapPin } from "lucide-react";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cities } from "@/lib/cities";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Service Area",
  description: "See the Florida cities served by HVAC Services.",
};

export default function ServiceAreaPage() {
  return (
    <section className="px-5 py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Service area"
          title="HVAC service across Florida communities"
          subtitle="The demo starts with statewide coverage and can be narrowed to real client cities, counties, or neighborhoods."
        />
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex min-h-[420px] items-center justify-center rounded-[2rem] bg-navy bg-hero-grid text-center text-white shadow-card">
            <div>
              <MapPin className="mx-auto text-orange" size={52} />
              <h2 className="mt-4 text-3xl font-black">Map embed ready</h2>
              <p className="mt-2 text-white/70">Replace with a real Google Maps embed for launch.</p>
            </div>
          </div>
          <div>
            <div className="flex flex-wrap gap-2">
              {cities.map((city) => (
                <span key={city} className="rounded-full bg-grey px-4 py-2 text-sm font-bold text-navy">
                  {city}
                </span>
              ))}
            </div>
            <div className="mt-8 rounded-[2rem] bg-grey p-7">
              <h2 className="text-2xl font-black text-navy">Need service nearby?</h2>
              <p className="mt-3 leading-7 text-muted">
                Call {siteConfig.phone} and confirm availability for your neighborhood.
              </p>
              <ButtonLink href={siteConfig.phoneHref} className="mt-6">
                Call Now
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
