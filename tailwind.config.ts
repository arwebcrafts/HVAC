import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy:      "#0A1628",
        "navy-mid": "#0f2040",
        "navy-light": "#152a4a",
        orange:    "#E05C28",
        "orange-dark": "#c94a1e",
        "orange-light": "#ff7a45",
        grey:      "#F4F6F9",
        muted:     "#6B7280",
        ink:       "#1C1C1E",
      },
      boxShadow: {
        card:  "0 4px 24px rgba(10, 22, 40, 0.10)",
        hover: "0 20px 60px rgba(224, 92, 40, 0.25)",
        glow:  "0 0 40px rgba(224, 92, 40, 0.35), 0 4px 20px rgba(224, 92, 40, 0.25)",
        "glow-sm": "0 0 20px rgba(224, 92, 40, 0.3)",
        glass: "0 8px 32px rgba(10, 22, 40, 0.25)",
        "inner-orange": "inset 0 1px 0 rgba(255,255,255,0.1)",
      },
      borderRadius: {
        card:  "16px",
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      backgroundImage: {
        "hero-grid": [
          "radial-gradient(circle at 20% 20%, rgba(224,92,40,0.3), transparent 40%)",
          "radial-gradient(circle at 80% 80%, rgba(15,32,64,0.8), transparent 40%)",
          "radial-gradient(circle at 50% 50%, rgba(10,22,40,0.9), transparent 70%)",
          "linear-gradient(135deg, #0A1628 0%, #0f2040 50%, #0A1628 100%)",
        ].join(", "),
        "orange-gradient": "linear-gradient(135deg, #E05C28 0%, #ff7a45 50%, #c94a1e 100%)",
        "navy-gradient": "linear-gradient(135deg, #0A1628 0%, #0f2040 100%)",
        "card-shine": "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)",
      },
      animation: {
        "float":       "float 4s ease-in-out infinite",
        "pulse-glow":  "pulse-glow 2.5s ease-in-out infinite",
        "badge-pulse": "badge-pulse 2s ease-in-out infinite",
        "spin-slow":   "spin-slow 20s linear infinite",
        "orb-float":   "orb-float 8s ease-in-out infinite",
        "fade-up":     "fade-up 0.6s ease-out both",
        "shimmer":     "shimmer 4s linear infinite",
        "slide-in-right": "slide-in-right 0.4s cubic-bezier(0.34,1.56,0.64,1)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":       { transform: "translateY(-12px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(224,92,40,0.4), 0 0 40px rgba(224,92,40,0.2)" },
          "50%":       { boxShadow: "0 0 35px rgba(224,92,40,0.7), 0 0 70px rgba(224,92,40,0.4)" },
        },
        "badge-pulse": {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%":       { transform: "scale(1.05)", opacity: "0.9" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to:   { transform: "rotate(360deg)" },
        },
        "orb-float": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%":       { transform: "translate(30px, -20px) scale(1.05)" },
          "66%":       { transform: "translate(-20px, 15px) scale(0.97)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          from: { transform: "translateX(100%)", opacity: "0" },
          to:   { transform: "translateX(0)", opacity: "1" },
        },
      },
      transitionTimingFunction: {
        bounce: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
