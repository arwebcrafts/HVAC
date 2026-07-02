import type { Metadata } from "next";

import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${siteConfig.name}.`,
};

export default function PrivacyPolicyPage() {
  return (
    <section className="px-5 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-black uppercase tracking-[0.24em] text-orange">Privacy policy</p>
        <h1 className="mt-4 text-5xl font-black tracking-tight text-navy">Privacy Policy</h1>
        <div className="mt-8 space-y-6 leading-8 text-muted">
          <p>
            {siteConfig.name} respects your privacy. This policy explains how contact details
            submitted through the website may be used to respond to HVAC service requests in Delray
            Beach and Palm Beach County.
          </p>
          <p>
            Information submitted through forms may include name, phone number, email address,
            preferred service, and message details. This information is used to schedule service,
            respond to questions, and improve customer communication.
          </p>
          <p>
            A live client site should replace this demo text with a policy reviewed for the actual
            business, tools, analytics, advertising platforms, and jurisdiction.
          </p>
        </div>
      </div>
    </section>
  );
}
