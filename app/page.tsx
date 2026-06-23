import {
  ContactSection,
  FinancingBanner,
  HeroSection,
  HowItWorks,
  ResultsSection,
  ReviewsSection,
  ServiceAreaSection,
  ServicesGrid,
  SocialProofStrip,
  WhyChooseUs,
} from "@/components/sections/HomeSections";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SocialProofStrip />
      <ServicesGrid />
      <WhyChooseUs />
      <ResultsSection />
      <ReviewsSection />
      <FinancingBanner />
      <HowItWorks />
      <ServiceAreaSection />
      <ContactSection />
    </>
  );
}
