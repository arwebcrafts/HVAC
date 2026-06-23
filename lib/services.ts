import {
  AlertTriangle,
  ClipboardCheck,
  CloudSun,
  Flame,
  Home,
  Snowflake,
  Thermometer,
  Wind,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  longDescription: string;
  icon: LucideIcon;
  highlights: string[];
  faqs: { question: string; answer: string }[];
};

export const services: Service[] = [
  {
    slug: "ac-repair",
    title: "AC Repair",
    eyebrow: "Same-day cooling help",
    description: "Fast diagnosis and repair for all major AC brands.",
    longDescription:
      "When Florida heat hits hard, our certified technicians find the issue quickly, explain your options clearly, and complete most cooling repairs the same day.",
    icon: Wind,
    highlights: ["24/7 emergency dispatch", "Upfront repair pricing", "All brands serviced"],
    faqs: [
      {
        question: "How quickly can you repair my AC?",
        answer: "Most calls are scheduled the same day, with emergency appointments available 24/7.",
      },
      {
        question: "Do you repair older systems?",
        answer: "Yes. We service older and newer units and will explain when replacement is the smarter choice.",
      },
    ],
  },
  {
    slug: "ac-installation",
    title: "AC Installation",
    eyebrow: "High-efficiency replacements",
    description: "New cooling systems sized correctly for your home.",
    longDescription:
      "We install efficient AC systems with load-conscious recommendations, clean workmanship, clear timelines, and financing options for qualified homeowners.",
    icon: Snowflake,
    highlights: ["Free replacement estimates", "Financing options", "Clean, code-ready installs"],
    faqs: [
      {
        question: "Do you offer financing?",
        answer: "Yes. Flexible financing options are available subject to credit approval.",
      },
      {
        question: "How long does installation take?",
        answer: "Most standard AC replacements are completed in one day.",
      },
    ],
  },
  {
    slug: "furnace-repair",
    title: "Furnace Repair",
    eyebrow: "Reliable heat restored",
    description: "Heating repairs for gas, oil, and electric systems.",
    longDescription:
      "From ignition problems to airflow issues, we troubleshoot furnace failures with clear pricing and practical repair recommendations.",
    icon: Flame,
    highlights: ["Gas and electric systems", "Safety checks included", "Emergency heating service"],
    faqs: [
      {
        question: "Do Florida homes need furnace service?",
        answer: "Yes. Even seasonal systems need safe ignition, airflow, and control checks.",
      },
      {
        question: "Can you fix short cycling?",
        answer: "Yes. We inspect filters, airflow, sensors, controls, and sizing issues.",
      },
    ],
  },
  {
    slug: "furnace-installation",
    title: "Furnace Installation",
    eyebrow: "Comfort-ready heating",
    description: "Efficient furnace replacements with neat installation.",
    longDescription:
      "Our team helps you choose a properly sized heating system, removes the old equipment, and leaves the mechanical area clean and organized.",
    icon: Home,
    highlights: ["Right-sized equipment", "Permit-aware work", "Warranty guidance"],
    faqs: [
      {
        question: "Will you remove the old furnace?",
        answer: "Yes. Standard removal and cleanup are included with replacement projects.",
      },
      {
        question: "Do new furnaces include warranties?",
        answer: "Most systems include manufacturer warranties, and we explain coverage before installation.",
      },
    ],
  },
  {
    slug: "heat-pump",
    title: "Heat Pump Services",
    eyebrow: "Efficient year-round comfort",
    description: "Heat pump repair, replacement, and seasonal tune-ups.",
    longDescription:
      "Heat pumps are ideal for many Florida homes. We maintain, repair, and install systems that cool efficiently and provide dependable heating when temperatures dip.",
    icon: Thermometer,
    highlights: ["Repair and replacement", "Seasonal tune-ups", "Efficiency optimization"],
    faqs: [
      {
        question: "Are heat pumps good for Florida?",
        answer: "Yes. Florida's climate makes heat pumps an efficient year-round comfort option.",
      },
      {
        question: "How often should I service a heat pump?",
        answer: "Twice per year is best because heat pumps work in both cooling and heating seasons.",
      },
    ],
  },
  {
    slug: "emergency-hvac",
    title: "Emergency HVAC",
    eyebrow: "24/7 urgent response",
    description: "Fast help when heating or cooling cannot wait.",
    longDescription:
      "No cooling, strange electrical smells, leaking equipment, or no heat overnight? Our emergency dispatch keeps homeowners moving with real response windows.",
    icon: AlertTriangle,
    highlights: ["Calls answered 24/7", "Priority scheduling", "Clear arrival updates"],
    faqs: [
      {
        question: "What counts as an emergency?",
        answer: "No cooling in extreme heat, no heat overnight, water leaks, electrical smells, or unsafe equipment behavior.",
      },
      {
        question: "Do emergency visits cost more?",
        answer: "After-hours fees may apply, but pricing is explained before work begins.",
      },
    ],
  },
  {
    slug: "indoor-air-quality",
    title: "Indoor Air Quality",
    eyebrow: "Cleaner air at home",
    description: "Air purifiers, humidifiers, filters, and UV solutions.",
    longDescription:
      "Improve comfort and reduce airborne irritants with practical indoor air upgrades matched to your home, system, and family needs.",
    icon: CloudSun,
    highlights: ["Filtration upgrades", "UV and purifier options", "Humidity guidance"],
    faqs: [
      {
        question: "Can HVAC improve allergies?",
        answer: "Better filtration and air treatment can reduce many airborne irritants in the home.",
      },
      {
        question: "Do you install whole-home purifiers?",
        answer: "Yes. We install solutions that integrate with compatible HVAC systems.",
      },
    ],
  },
  {
    slug: "duct-cleaning",
    title: "Duct Cleaning & Sealing",
    eyebrow: "Cleaner ducts, better airflow",
    description: "Professional duct cleaning, inspection, and sealing.",
    longDescription:
      "Leaky or dirty ducts waste energy and can hurt indoor air quality. We inspect, clean, and recommend sealing where it actually helps.",
    icon: Wrench,
    highlights: ["Airflow inspection", "Leak recommendations", "Cleaner vents and returns"],
    faqs: [
      {
        question: "How do I know ducts need cleaning?",
        answer: "Heavy dust, musty smells, visible debris, or recent renovation work are common signs.",
      },
      {
        question: "Do you seal duct leaks?",
        answer: "Yes. We identify leakage and recommend sealing when it improves comfort or efficiency.",
      },
    ],
  },
  {
    slug: "maintenance-plans",
    title: "Maintenance Plans",
    eyebrow: "Prevent surprise breakdowns",
    description: "Annual plans that protect comfort and lower repair risk.",
    longDescription:
      "Maintenance members get seasonal tune-ups, priority scheduling, and practical system care that helps extend equipment life.",
    icon: ClipboardCheck,
    highlights: ["Two tune-ups per year", "Priority scheduling", "Repair savings"],
    faqs: [
      {
        question: "What is included in maintenance?",
        answer: "Seasonal inspection, cleaning, safety checks, performance checks, and system recommendations.",
      },
      {
        question: "Can maintenance reduce breakdowns?",
        answer: "Yes. Regular maintenance catches many problems before they become expensive failures.",
      },
    ],
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
