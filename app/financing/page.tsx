import type { Metadata } from "next";
import { BadgeDollarSign, Clock, FileCheck } from "lucide-react";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Financing",
  description: "Explore HVAC financing options for replacement systems and urgent comfort upgrades.",
};

const options = [
  {
    icon: BadgeDollarSign,
    title: "Flexible monthly options",
    text: "Help customers move forward with a new system without delaying comfort.",
  },
  {
    icon: Clock,
    title: "Fast approval messaging",
    text: "Financing content supports urgent replacement decisions when the old system fails.",
  },
  {
    icon: FileCheck,
    title: "Clear terms",
    text: "Subject-to-approval language keeps the page professional and realistic.",
  },
];

export default function FinancingPage() {
  return (
    <section className="px-5 py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Financing"
          title="New system? Build confidence around the investment"
          subtitle="A dedicated financing page helps replacement leads take the next step when price is the biggest objection."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {options.map((option) => {
            const Icon = option.icon;
            return (
              <div key={option.title} className="rounded-[2rem] bg-grey p-7">
                <Icon className="text-orange" size={32} />
                <h2 className="mt-5 text-xl font-black text-navy">{option.title}</h2>
                <p className="mt-3 leading-7 text-muted">{option.text}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-12 rounded-[2rem] bg-navy p-8 text-center text-white">
          <h2 className="text-3xl font-black">Check your options with no pressure</h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/70">
            Subject to credit approval. Final terms depend on provider, credit profile, and project
            scope.
          </p>
          <ButtonLink href="/contact" className="mt-7">
            Request Financing Info
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
