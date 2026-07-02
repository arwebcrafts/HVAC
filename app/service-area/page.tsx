import type { Metadata } from "next";
import { Clock, MapPin } from "lucide-react";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { GoogleMapEmbed } from "@/components/ui/GoogleMapEmbed";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cities } from "@/lib/cities";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Service Area",
  description: `See the cities served by ${siteConfig.name} in Palm Beach County and South Florida.`,
};

export default function ServiceAreaPage() {
  return (
    <section className="px-5 py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Service area"
          title="HVAC service in Delray Beach and Palm Beach County"
          subtitle={siteConfig.serviceAreaLabel}
        />
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="overflow-hidden rounded-[2rem] bg-navy shadow-card">
            <GoogleMapEmbed height={420} className="h-[420px] w-full" />
          </div>
          <div>
            <div className="rounded-[2rem] bg-grey p-6">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 text-orange" size={22} />
                <div>
                  <h2 className="text-xl font-black text-navy">{siteConfig.name}</h2>
                  <p className="mt-2 text-muted">
                    {siteConfig.address.street}, {siteConfig.address.city}, {siteConfig.address.state}{" "}
                    {siteConfig.address.zip}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-3 text-sm font-semibold text-navy">
                <Clock size={18} className="text-orange" />
                Open 24 hours
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
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
