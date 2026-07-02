import { siteConfig } from "@/lib/site-config";

type GoogleMapEmbedProps = {
  title?: string;
  className?: string;
  height?: number;
};

export function GoogleMapEmbed({
  title = `${siteConfig.name} service area map`,
  className = "",
  height = 440,
}: GoogleMapEmbedProps) {
  return (
    <iframe
      title={title}
      src={siteConfig.googleMapsEmbedUrl}
      width="100%"
      height={height}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className={`border-0 ${className}`}
      allowFullScreen
    />
  );
}
