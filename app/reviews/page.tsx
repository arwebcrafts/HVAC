import type { Metadata } from "next";
import { ExternalLink, Phone, Star } from "lucide-react";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { serviceCommitments } from "@/lib/reviews";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Reviews",
  description: `See how ${siteConfig.name} serves Delray Beach and Palm Beach County with 24/7 HVAC repair and installation.`,
};

export default function ReviewsPage() {
  return (
    <section className="px-5 py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Customer experience"
          title="Trusted local HVAC help in Palm Beach County"
          subtitle={`${siteConfig.name} is listed on Google Maps with ${siteConfig.googleRating.count} reviews. For the fastest response, call ${siteConfig.phone} any time.`}
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {serviceCommitments.map((item) => (
            <article key={item.title} className="rounded-[2rem] bg-white p-7 shadow-card">
              <Star className="text-orange" size={24} />
              <h2 className="mt-4 text-xl font-black text-navy">{item.title}</h2>
              <p className="mt-3 leading-7 text-muted">{item.text}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-[2rem] bg-navy p-8 text-center text-white">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-orange">
            Google Business Profile
          </p>
          <h2 className="mt-4 text-3xl font-black">Find Iris Cooling LLC on Google Maps</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-white/70">
            View directions, business hours, and public Google reviews for our Delray Beach HVAC
            service.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <ButtonLink href={siteConfig.socials.google}>
              <ExternalLink size={16} />
              Open Google Listing
            </ButtonLink>
            <ButtonLink href={siteConfig.phoneHref} variant="outline">
              <Phone size={16} />
              Call {siteConfig.phone}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
