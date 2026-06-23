export const siteConfig = {
  name: "HVAC Services",
  shortName: "HVAC Services",
  tagline: "Your Comfort, Our Priority",
  description:
    "Fast, reliable HVAC repair, installation, maintenance, and emergency service across Florida.",
  url: "https://summitair.example",
  phone: "(555) 000-0000",
  phoneHref: "tel:+15550000000",
  smsHref: "sms:+15550000000",
  whatsappHref: "https://wa.me/15550000000",
  email: "hello@summitair.example",
  address: {
    street: "123 Service Rd",
    city: "Orlando",
    state: "FL",
    zip: "32801",
    country: "US",
  },
  license: "FL HVAC License #CAC000000",
  hours: [
    "Mon-Fri: 7:00 AM - 7:00 PM",
    "Saturday: 8:00 AM - 5:00 PM",
    "Sunday: Emergency only",
  ],
  socials: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    google: "https://google.com",
    yelp: "https://yelp.com",
  },
};

export type SiteConfig = typeof siteConfig;
