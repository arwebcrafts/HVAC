import type { Metadata } from "next";
import { Star } from "lucide-react";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { reviews } from "@/lib/reviews";

export const metadata: Metadata = {
  title: "Reviews",
  description: "Read customer reviews for fast, professional HVAC repair and installation service.",
};

export default function ReviewsPage() {
  return (
    <section className="px-5 py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Customer reviews"
          title="Proof that service quality matters"
          subtitle="Reviews highlight what customers care about most: fast response, fair pricing, clean work, and clear communication."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <figure key={review.name} className="rounded-[2rem] bg-white p-7 shadow-card">
              <div className="flex gap-1 text-[#F59E0B]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} size={18} fill="currentColor" />
                ))}
              </div>
              <blockquote className="mt-5 leading-7 text-muted">{review.text}</blockquote>
              <figcaption className="mt-6 font-black text-navy">
                {review.name}
                <span className="block text-sm font-semibold text-muted">{review.city}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
