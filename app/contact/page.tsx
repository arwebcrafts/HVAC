import type { Metadata } from "next";

import { ContactSection } from "@/components/sections/HomeSections";

export const metadata: Metadata = {
  title: "Contact",
  description: "Schedule HVAC repair, installation, maintenance, or emergency service.",
};

export default function ContactPage() {
  return <ContactSection />;
}
