# HVAC Demo Website — Cursor Build Prompt

You are building a **world-class, multi-page HVAC company website** as a universal demo.
No specific business name, address, or logo. Every placeholder reads like a real, professional local HVAC company in Florida.

---

## Stack

```

Animations:       Framer Motion
Icons:            Lucide React
Fonts:            Inter — via next/font/google
Forms:            React Hook Form
Schema Markup:    JSON-LD in layout.tsx <head>
Maps:             Google Maps iframe embed (placeholder API key)
Video:            HTML5 <video> tag — Pexels free HVAC video URL
Image handling:   next/image (lazy load, width/height required)
Deployment-ready: Vercel
```

---

## Install Dependencies

```bash
npx create-next-app@latest hvac-demo --typescript --tailwind --app
cd hvac-demo
npm install framer-motion lucide-react react-hook-form
```

---

## Tailwind Config — Add Custom Colors

In `tailwind.config.ts`:

```ts
theme: {
  extend: {
    colors: {
      navy:    '#0A1628',
      orange:  '#E05C28',
      grey:    '#F4F6F9',
      muted:   '#6B7280',
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
  },
},
```

---

## Global CSS Variables

In `app/globals.css`:

```css
:root {
  --color-navy:    #0A1628;
  --color-orange:  #E05C28;
  --color-white:   #FFFFFF;
  --color-grey:    #F4F6F9;
  --color-muted:   #6B7280;
  --color-text:    #1C1C1E;
  --radius-card:   12px;
  --shadow-card:   0 4px 24px rgba(10,22,40,0.10);
  --shadow-hover:  0 8px 32px rgba(224,92,40,0.25);
  --transition:    all 0.3s ease;
}
```

---

## Folder Structure

```
app/
  layout.tsx              ← Root layout, schema JSON-LD, Google Font, sticky mobile bar
  page.tsx                ← Homepage (all sections)
  services/page.tsx       ← Services overview
  ac-repair/page.tsx
  ac-installation/page.tsx
  furnace-repair/page.tsx
  furnace-installation/page.tsx
  heat-pump/page.tsx
  emergency-hvac/page.tsx
  indoor-air-quality/page.tsx
  duct-cleaning/page.tsx
  maintenance-plans/page.tsx
  about/page.tsx
  reviews/page.tsx
  financing/page.tsx
  contact/page.tsx
  service-area/page.tsx
  privacy-policy/page.tsx

components/
  Navbar.tsx
  Hero.tsx
  SocialProofStrip.tsx
  ServicesGrid.tsx
  WhyChooseUs.tsx
  BeforeAfterSlider.tsx
  ReviewsCarousel.tsx
  FinancingBanner.tsx
  HowItWorks.tsx
  ServiceArea.tsx
  ContactForm.tsx
  Footer.tsx
  StickyMobileBar.tsx
  FloatingWhatsApp.tsx
  EmergencyTab.tsx
  StatsCounter.tsx

lib/
  reviews.ts              ← Reviews data array
  services.ts             ← Services data array
  cities.ts               ← Service area cities array
```

---

## Brand Identity

```
Primary:       #0A1628  Navy
Accent:        #E05C28  Orange-Red (urgency)
White:         #FFFFFF
Light Grey:    #F4F6F9
Text:          #1C1C1E
Muted:         #6B7280

Font:          Inter (Google Fonts) — Bold headings, Regular body
Tagline:       "Your Comfort, Our Priority"
Tone:          Professional · Local · Reliable · Urgent
Logo:          Text wordmark "[Your Company] Heating & Cooling" — white on navy
```

---

## Section 1 — Navbar (`components/Navbar.tsx`)

**Behaviour:**
- Sticky top, `z-50`
- On scroll down: hide navbar (`translateY(-100%)`)
- On scroll up: show navbar
- Background: `navy` with `backdrop-blur` when scrolled
- Logo: left — white text wordmark
- Links: right — Services | About | Reviews | Service Area | Contact
- CTA button: red pill — `📞 Call Now — 24/7`
- Mobile: hamburger → full-screen slide-in menu overlay
- Active section highlight using `IntersectionObserver`

---

## Section 2 — Hero (`components/Hero.tsx`)

**Layout:** Full viewport height (`100vh`), centered content

**Background:**
- HTML5 `<video>` tag — looping HVAC work video
- Suggested free video: `https://www.pexels.com/video/technician-repairing-air-conditioning-unit-4792446/`
- Download and place in `/public/hero.mp4`
- Dark overlay: `bg-navy/65` over the video
- Fallback (if video missing): deep navy gradient + animated CSS floating particles (white dots, `@keyframes float`)

**Content (vertically centered, left-aligned on desktop, centered on mobile):**

```
Label chip:      "🔧 Licensed & Insured | Florida's Trusted HVAC Team"
                 — small pill, orange border, white text

H1 (bold, white, large — text-5xl md:text-7xl):
  "Fast, Reliable HVAC Service —
   Heating, Cooling & Emergency Repairs"

Subheadline (white, regular, text-xl):
  "We keep your home comfortable 365 days a year.
   Licensed, insured, and locally trusted."

CTA Buttons (side by side, stacked on mobile):
  Button 1: red fill  — "📞 Call Now — 24/7 Emergency" → href="tel:+15550000000"
  Button 2: white outline — "Get a Free Estimate" → scrolls to #contact

Trust badges (below buttons, flex row, small text):
  ✅ NATE Certified   ✅ BBB Accredited   ⭐ 5-Star Rated   ⚡ Same-Day Service
```

**Floating pulsing badge (fixed top-right inside hero):**
```
Text:       "🚨 EMERGENCY SERVICE AVAILABLE NOW"
Style:      Red background, white text, rounded pill
Animation:  CSS keyframe pulse — scale 1 → 1.06 → 1, infinite, 2s
```

---

## Section 3 — Social Proof Strip (`components/SocialProofStrip.tsx`)

```
Background:   #F4F6F9 (light grey)
Height:       80–100px
Layout:       flex, space-between, vertically centered

Left text:    "Trusted by 500+ homeowners and businesses across the area."
              — text-sm, muted color

Right logos (greyscale filter, flex row, gap-6):
  — Google Reviews badge: ⭐⭐⭐⭐⭐ 5.0
  — "BBB" text badge
  — "NATE Certified" text badge
  — "ENERGY STAR" text badge

Mobile: stack text above logos, logos in horizontal scroll row
```

---

## Section 4 — Services Grid (`components/ServicesGrid.tsx`)

```
Section title:   "Everything You Need Under One Roof"
Subtitle:        "From emergency repairs to full system installs — we handle it all."
Layout:          grid-cols-3 on desktop | grid-cols-1 on mobile
Gap:             gap-6
```

**Each card:**
```
Background:    white
Border:        1px solid #E5E7EB
Border-radius: 12px
Padding:       24px
Shadow:        var(--shadow-card)
Hover:         translateY(-6px) + box-shadow: var(--shadow-hover) — 0.3s ease

Contents:
  — Icon: SVG in orange-red circle background (48px)
  — Title: bold, navy, text-lg
  — Description: 2 lines, muted, text-sm
  — "Learn More →" link: orange-red, text-sm, hover underline
```

**Services data (create `lib/services.ts`):**

```ts
export const services = [
  {
    icon: "Wind",
    title: "AC Repair",
    description: "Fast diagnosis and repair of all AC brands. Most repairs done same day.",
    href: "/ac-repair",
  },
  {
    icon: "Snowflake",
    title: "AC Installation",
    description: "New high-efficiency systems with upfront pricing. No surprise fees.",
    href: "/ac-installation",
  },
  {
    icon: "Flame",
    title: "Furnace Repair",
    description: "Heating back in hours. We fix all makes and models — gas, oil, electric.",
    href: "/furnace-repair",
  },
  {
    icon: "Home",
    title: "Furnace Installation",
    description: "Energy-efficient furnace replacements with financing options available.",
    href: "/furnace-installation",
  },
  {
    icon: "Thermometer",
    title: "Heat Pump Services",
    description: "Installation, repair, and seasonal tune-ups for heat pump systems.",
    href: "/heat-pump",
  },
  {
    icon: "AlertTriangle",
    title: "Emergency HVAC",
    description: "24/7 same-day emergency service. We answer every call.",
    href: "/emergency-hvac",
  },
  {
    icon: "CloudSnow",
    title: "Indoor Air Quality",
    description: "Air purifiers, humidifiers, UV lights, and duct cleaning.",
    href: "/indoor-air-quality",
  },
  {
    icon: "Tool",
    title: "Duct Cleaning & Sealing",
    description: "Improve efficiency and air quality with professional duct service.",
    href: "/duct-cleaning",
  },
  {
    icon: "ClipboardList",
    title: "Maintenance Plans",
    description: "Annual plans that keep your system running and your costs low.",
    href: "/maintenance-plans",
  },
]
```

---

## Section 5 — Why Choose Us (`components/WhyChooseUs.tsx`)

```
Section title:   "Why Homeowners Choose Us Every Time"
Layout:          grid-cols-2 on desktop | grid-cols-1 on mobile
```

**Each box:**
```
Style:    white card, orange-red left border (4px), shadow, 24px padding

Box 1 — Shield icon
  Title:  "Licensed & Insured"
  Text:   "Every technician is fully licensed, insured, and background-checked.
           You always know who is coming to your home."

Box 2 — DollarSign icon
  Title:  "Upfront Pricing"
  Text:   "You get a clear written quote before we start any work.
           No hidden fees, no surprise charges — ever."

Box 3 — Zap icon
  Title:  "Same-Day Service"
  Text:   "In most cases we arrive the same day you call —
           often within 2 hours."

Box 4 — Settings icon
  Title:  "All Brands Serviced"
  Text:   "Trane, Carrier, Lennox, Rheem, York, Goodman, Bryant —
           we service every major brand."
```

---

## Section 6 — Before & After Slider (`components/BeforeAfterSlider.tsx`)

```
Section title:   "See the Difference We Make"
Subtitle:        "Real results from real jobs. Drag the slider to compare."
Layout:          3 cards, flex row on desktop | stacked on mobile
```

**Implementation (vanilla JS logic in React):**
```
- useState for slider position (0–100, default 50)
- onMouseMove + onTouchMove on the container div
- Clip the "after" image using: clipPath or width percentage
- Drag handle: white circle, centered, absolute positioned
- Before: desaturated CSS filter (grayscale + brightness -20%)
- After: full colour
- Smooth drag with requestAnimationFrame
```

**If no real photos — use CSS placeholder divs:**
```
Before side: bg-gray-700 with centered white text "BEFORE"
After side:  bg-orange gradient with centered white text "AFTER"
```

**3 Pairs:**
```
1. Title: "AC Unit Replacement"
   Caption: "Old R-22 unit replaced with new high-efficiency system"

2. Title: "Air Duct Cleaning"
   Caption: "Ducts cleaned — better air quality, lower energy bills"

3. Title: "Furnace Installation"
   Caption: "Full furnace replacement with neat, organized installation"
```

---

## Section 7 — Reviews Carousel (`components/ReviewsCarousel.tsx`)

```
Section title:   "What Our Customers Say"
Layout:          3 cards visible on desktop | 1 on mobile
Auto-scroll:     every 4 seconds
Pause:           on mouse hover
Swipe:           touch events for mobile
Dots:            indicator dots below carousel
Transition:      CSS transform translateX, smooth
```

**Each card:**
```
Background:    white, shadow, rounded-xl, padding 24px
Top-left:      Google "G" coloured logo (SVG inline)
Stars:         ⭐⭐⭐⭐⭐ — gold (#F59E0B)
Quote:         text-sm, #1C1C1E, 3 lines max
Name + City:   text-sm bold + muted city
```

**Reviews data (create `lib/reviews.ts`):**

```ts
export const reviews = [
  {
    name: "James R.",
    city: "Orlando, FL",
    text: "AC died on a 98° Friday afternoon. They arrived in 90 minutes, diagnosed the problem fast, and had us cool by dinner. Unbelievable service.",
  },
  {
    name: "Maria S.",
    city: "Tampa, FL",
    text: "Very professional from the estimate to the install. New Trane system works perfectly and the price was exactly what they quoted. Zero surprises.",
  },
  {
    name: "Kevin T.",
    city: "Miami, FL",
    text: "Our furnace went out overnight in January. They had a tech at our door by 8am. Fixed in under an hour. Could not recommend them enough.",
  },
  {
    name: "Sandra L.",
    city: "Jacksonville, FL",
    text: "Been using them for 3 years for annual maintenance. Always on time, always honest about what does and does not need fixing. Rare to find.",
  },
  {
    name: "Tom M.",
    city: "Sarasota, FL",
    text: "Replaced our entire HVAC system. They walked us through every option, helped us get financing, and the installation was clean and professional.",
  },
]
```

---

## Section 8 — Financing Banner (`components/FinancingBanner.tsx`)

```
Background:   linear-gradient(135deg, #E05C28, #c94a1e)
Text:         white, centered

Headline:     "New System? 0% Financing Available."
              — text-4xl font-bold

Subtext:      "We make it easy to upgrade your home comfort
               without the upfront cost. Quick approval, flexible terms."

CTA Button:   white background, navy text
              "Check Your Options — No Credit Impact"
              → href="/financing"

Small print:  "Subject to credit approval. Ask your technician for details."
              — text-xs, white/70
```

---

## Section 9 — How It Works (`components/HowItWorks.tsx`)

```
Section title:   "Getting Help Is Simple"
Layout:          4 steps, horizontal flex on desktop | vertical on mobile
Connector:       dashed line between step circles
Step circles:    orange-red background, white number, 48px
```

**Steps:**
```
1. 📞 Call or Book Online
   "Reach us by phone, text, or online form — 24/7.
    We confirm your appointment within 15 minutes."

2. 🔍 We Diagnose
   "A certified technician arrives, inspects the issue,
    and gives you a clear upfront price before starting."

3. 🔧 We Fix It
   "Work begins immediately with your approval.
    Most jobs completed the same day."

4. 😊 You Stay Comfortable
   "We follow up after the job to make sure
    everything is running perfectly."
```

**Animated stat counter below steps:**
```
Component:    StatsCounter.tsx
Trigger:      IntersectionObserver — fires when section enters viewport
Stats:
  — "4,800+" — HVAC Jobs Completed
  — "500+"   — Happy Customers
  — "24/7"   — Emergency Availability
  — "2 Hr"   — Average Response Time

Animation:    count from 0 → final value over 1.5s using requestAnimationFrame
```

---

## Section 10 — Service Area (`components/ServiceArea.tsx`)

```
Section title:   "We Serve Your Area"
Layout:          map left (60%) + city list right (40%) on desktop | stacked mobile
```

**Map:**
```
Use Google Maps iframe embed:
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!..."
    width="100%" height="400" style="border:0"
    allowfullscreen loading="lazy"
    referrerpolicy="no-referrer-when-downgrade">
  </iframe>

Placeholder if no API:
  Styled div, bg navy, centered map-pin SVG icon, text "Your Service Area"
```

**City chips data (`lib/cities.ts`):**
```ts
export const cities = [
  "Orlando", "Tampa", "Miami", "Jacksonville", "Sarasota",
  "Fort Lauderdale", "St. Petersburg", "Clearwater",
  "Naples", "Gainesville", "Pensacola", "Tallahassee",
]
```

**City chip style:**
```
Pill shape: rounded-full, bg-grey, navy text, border navy
Hover:      bg-navy, white text
Wrap in flex flex-wrap gap-2
```

**Below map:**
```
Text:    "Not sure if we cover your area?
          Call us now and we will confirm in 30 seconds."
Button:  Red — "📞 Call Now"
```

---

## Section 11 — Contact Form (`components/ContactForm.tsx`)

```
Section title:   "Ready To Schedule?"
Subtitle:        "Book online or call us now — we respond fast."
Layout:          2 columns on desktop | stacked on mobile
```

**Left — Form (React Hook Form):**
```
Fields:
  name          — text input, required
  phone         — tel input, required
  email         — email input, required
  service       — select dropdown, required
                  Options: AC Repair | AC Installation | Furnace Repair
                           Furnace Installation | Heat Pump | Emergency Service
                           Duct Cleaning | Maintenance Plan | Other
  preferredDate — date input
  message       — textarea, 4 rows, optional

Submit button:
  Full width, red background, white text
  "Book My Appointment Now"
  Loading state: spinner icon

Below form:
  "✅ We respond to all requests within 15 minutes during business hours.
   Emergency calls answered 24/7."
```

**Right — Contact Info:**
```
Phone:    (555) 000-0000  — large, bold, tel: link, orange color
WhatsApp: "💬 Chat on WhatsApp" → wa.me/15550000000
Email:    hello@yourcompany.com
Address:  123 Service Rd, Orlando, FL 32801
Hours:
  Mon–Fri:  7:00 AM – 7:00 PM
  Saturday: 8:00 AM – 5:00 PM
  Sunday:   Emergency only
Badge:    🔴 pulsing dot + "Emergency? We answer 24/7."
```

---

## Sticky Mobile Bar (`components/StickyMobileBar.tsx`)

```
Visibility:   md:hidden (hidden on desktop)
Position:     fixed bottom-0 left-0 right-0, z-[9999]
Height:       64px
Layout:       grid grid-cols-2

Button 1 (left):
  bg-orange (#E05C28), white text
  "📞 Call Now"
  href="tel:+15550000000"

Button 2 (right):
  bg-navy (#0A1628), white text
  "💬 Text Us"
  href="sms:+15550000000"

IMPORTANT: Never hide, conditionally render off, or reduce size.
           This is the #1 mobile conversion element.
```

---

## Floating Elements

**FloatingWhatsApp.tsx:**
```
Position:    fixed bottom-6 right-6, z-50
Style:       green circle (#25D366), 56px, shadow-lg
Icon:        WhatsApp SVG icon, white
Tooltip:     "Chat with us" — appears on hover
Delay:       appears after 3s using setTimeout + useState
Link:        href="https://wa.me/15550000000" target="_blank"
```

**EmergencyTab.tsx:**
```
Position:    fixed right-0, top-1/2, transform -translate-y-1/2, z-50
Style:       bg-orange (#E05C28), white text, rotate-90, rounded-t-lg
Text:        "🚨 Emergency"
Animation:   CSS pulse every 2s
Click:       scrolls to #contact or href="tel:+15550000000"
```

---

## Footer (`components/Footer.tsx`)

```
Background:   #0A1628 (navy)
Text:         white
Layout:       3 columns on desktop | stacked on mobile
Padding:      py-16 px-8

Column 1 — Brand:
  Logo wordmark
  Description: "Professional HVAC services — heating, cooling, and
  air quality for homes and businesses across Florida."
  Social icons row (24px, white, hover: orange):
    Facebook | Instagram | Google | Yelp

Column 2 — Services:
  Heading: "Services"
  Links: AC Repair | AC Installation | Furnace Repair & Install
         Heat Pump | Emergency HVAC | Duct Cleaning | Maintenance Plans

Column 3 — Company:
  Heading: "Company"
  Links: About Us | Reviews | Service Area | Financing | Contact
         Privacy Policy | Terms of Service

Bottom bar (border-t border-white/10, mt-12, py-6):
  Left:  "© 2026 [Your Company] Heating & Cooling. All rights reserved."
  Right: "Licensed & Insured | FL HVAC License #CAC000000"
```

---

## Schema Markup — paste in `app/layout.tsx` inside `<head>`

```json
{
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "HVACBusiness"],
  "name": "[Your Company] Heating & Cooling",
  "url": "https://yourcompany.com",
  "logo": "https://yourcompany.com/logo.png",
  "image": "https://yourcompany.com/og-image.jpg",
  "telephone": "(555) 000-0000",
  "email": "hello@yourcompany.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Service Rd",
    "addressLocality": "Orlando",
    "addressRegion": "FL",
    "postalCode": "32801",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 28.5383,
    "longitude": -81.3792
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "07:00",
      "closes": "19:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "08:00",
      "closes": "17:00"
    }
  ],
  "priceRange": "$$",
  "areaServed": {"@type": "State", "name": "Florida"},
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "127"
  }
}
```

---

## Animations (Framer Motion)

```tsx
// Use on every section wrapper for scroll fade-in
import { motion } from "framer-motion"

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

// Wrap each section:
<motion.section
  variants={fadeUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
>
```

---

## Performance Checklist

```
✅ next/image for all images — width + height + loading="lazy" + priority on hero
✅ next/font for Inter — font-display: swap
✅ <video> — autoplay muted loop playsInline, no audio
✅ Dynamic imports for heavy components (carousel, slider)
✅ All icons: Lucide React (tree-shakeable, no bundle bloat)
✅ Target: Lighthouse 90+ across all 4 categories
✅ Core Web Vitals: LCP < 2.5s | FID < 100ms | CLS < 0.1
```

---

## SEO Meta Tags — per page in `metadata` export

```ts
export const metadata = {
  title: "[Your Company] Heating & Cooling | HVAC Repair & Installation — Florida",
  description: "Fast, reliable HVAC repair, installation, and emergency service across Florida. Licensed & insured. Same-day service. Call now.",
  keywords: "HVAC repair Florida, AC repair Orlando, furnace installation Tampa, emergency HVAC Miami",
  openGraph: {
    title: "[Your Company] Heating & Cooling",
    description: "Florida's trusted HVAC team. Same-day service. 24/7 emergency.",
    url: "https://yourcompany.com",
    siteName: "[Your Company] Heating & Cooling",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
}
```

---

## Client Customisation Checklist

> When converting the demo into a live client site — change only these:

```
[ ] Replace "[Your Company]" with real business name — everywhere
[ ] Update phone number in all tel: and sms: links + display text
[ ] Update email address
[ ] Update physical address + city + zip code
[ ] Replace city chips array in lib/cities.ts with real service areas
[ ] Add real logo image → swap text wordmark
[ ] Replace before/after placeholder divs with real job photos
[ ] Replace Google Maps placeholder with real embed using their address
[ ] Update Google review link in ReviewsCarousel
[ ] Add FL HVAC license number in footer
[ ] Connect real domain
[ ] Add Google Analytics 4 tracking ID to layout.tsx
[ ] Add Google Search Console verification meta tag
[ ] Replace Pexels hero video with real company video (optional)
[ ] Update aggregateRating reviewCount in schema to match real count
```

---

*HVAC Universal Demo | Florida Market | Local Business Growth Agency | © 2026*
