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
import {
  FAQSection,
  MaintenancePlans,
  QuoteEstimator,
  RecentJobsGallery,
  SavingsCalculator,
  TrustStrip,
} from "@/components/sections/ExtraSections";

export default function HomePage() {
  return (
    <>
      {/* Hero — cinematic background image with Ken Burns animation */}
      <HeroSection />

      {/* Trust credentials strip */}
      <TrustStrip />

      {/* Social proof bar */}
      <SocialProofStrip />

      {/* Services overview */}
      <ServicesGrid />

      {/* Why choose us — dark section */}
      <WhyChooseUs />

      {/* Interactive quote estimator — key lead gen tool */}
      <QuoteEstimator />

      {/* Energy savings calculator */}
      <SavingsCalculator />

      {/* Before & After drag slider */}
      <ResultsSection />

      {/* Recent Jobs Gallery */}
      <RecentJobsGallery />

      {/* Maintenance plans — recurring revenue */}
      <MaintenancePlans />

      {/* Customer reviews */}
      <ReviewsSection />

      {/* Financing CTA banner */}
      <FinancingBanner />

      {/* How it works + stats counter */}
      <HowItWorks />

      {/* FAQ accordion */}
      <FAQSection />

      {/* Service area map */}
      <ServiceAreaSection />

      {/* Contact form */}
      <ContactSection />
    </>
  );
}
