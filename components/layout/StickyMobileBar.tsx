import { MessageCircle, Phone } from "lucide-react";

import { siteConfig } from "@/lib/site-config";

export function StickyMobileBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] grid h-16 grid-cols-2 shadow-2xl md:hidden border-t border-white/5">
      <a
        href={siteConfig.phoneHref}
        className="inline-flex items-center justify-center gap-2 bg-orange-gradient text-sm font-black text-white transition active:scale-95"
      >
        <Phone size={17} />
        Call Now
      </a>
      <a
        href={siteConfig.smsHref}
        className="inline-flex items-center justify-center gap-2 bg-navy text-sm font-black text-white transition active:scale-95"
      >
        <MessageCircle size={17} />
        Text Us
      </a>
    </div>
  );
}
