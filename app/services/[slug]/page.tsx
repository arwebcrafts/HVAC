import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2, Phone } from "lucide-react";

import { ContactSection } from "@/components/sections/HomeSections";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqSchema, serviceSchema } from "@/lib/schema";
import { getService, services } from "@/lib/services";
import { siteConfig } from "@/lib/site-config";

type ServicePageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }: ServicePageProps): Metadata {
  const service = getService(params.slug);

  if (!service) {
    return {};
  }

  return {
    title: `${service.title} in Florida`,
    description: service.longDescription,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
  };
}

export default function ServicePage({ params }: ServicePageProps) {
  const service = getService(params.slug);

  if (!service) {
    notFound();
  }

  const Icon = service.icon;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema(service)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(service.faqs)) }}
      />

      <section className="bg-navy bg-hero-grid px-5 pb-20 pt-36 text-white lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-orange">
              {service.eyebrow}
            </p>
            <h1 className="mt-5 text-5xl font-black tracking-tight md:text-7xl">
              {service.title} in Florida
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-8 text-white/78">
              {service.longDescription}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={siteConfig.phoneHref} className="gap-2">
                <Phone size={18} />
                Call Now
              </ButtonLink>
              <ButtonLink href="#contact" variant="outline">
                Request Estimate
              </ButtonLink>
            </div>
          </div>
          <div className="rounded-[2rem] bg-white p-8 text-navy shadow-2xl">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange/10 text-orange">
              <Icon size={34} />
            </div>
            <h2 className="mt-6 text-2xl font-black">What is included</h2>
            <div className="mt-5 grid gap-4">
              {service.highlights.map((highlight) => (
                <div key={highlight} className="flex items-center gap-3">
                  <CheckCircle2 className="text-orange" size={20} />
                  <span className="font-bold">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <SectionHeading
            eyebrow="Common questions"
            title={`Questions about ${service.title.toLowerCase()}`}
            subtitle="Clear answers help customers decide faster and support rich search results."
          />
          <div className="mt-10 grid gap-4">
            {service.faqs.map((faq) => (
              <div key={faq.question} className="rounded-card bg-grey p-6">
                <h2 className="text-lg font-black text-navy">{faq.question}</h2>
                <p className="mt-2 leading-7 text-muted">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
