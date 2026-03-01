import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { loadContent } from "@/lib/content";

interface ServiceSection {
  id: string;
  title: string;
  bullets: string[];
  href: string;
  image: string;
  imageAlt: string;
}

export default function ServiceSections({
  locale,
}: {
  locale: string;
}) {
  const { sections } = loadContent<{ sections: ServiceSection[] }>(
    "service-sections",
    locale as "en" | "es" | "fr"
  );

  return (
    <>
      {sections.map((section, index) => {
        const isReversed = index % 2 === 1;
        const isImpact = index === sections.length - 1;

        const bgClass = isImpact
          ? "service-section-impact"
          : index % 2 === 0
            ? "bg-muted/40"
            : "";

        const textColorClass = isImpact ? "text-white" : "";
        const bulletColorClass = isImpact
          ? "text-white/80"
          : "text-muted-foreground";
        const linkColorClass = isImpact
          ? "text-white hover:text-white/80"
          : "text-accent hover:text-accent/80";

        return (
          <section
            key={section.id}
            id={section.id}
            className={`section-padding ${bgClass}`}
          >
            <div
              className={`mx-auto flex max-w-6xl flex-col items-center gap-12 md:flex-row ${
                isReversed ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Text Column */}
              <div className="flex-1 space-y-6">
                <h2
                  className={`text-3xl font-bold tracking-tight md:text-4xl ${textColorClass}`}
                  style={!isImpact ? { color: "oklch(0.45 0.10 185)" } : undefined}
                >
                  {section.title}
                </h2>

                <ul className="space-y-3">
                  {section.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className={`flex items-start gap-3 text-lg ${bulletColorClass}`}
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-current" />
                      {bullet}
                    </li>
                  ))}
                </ul>

                <Link
                  href={section.href}
                  className={`inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider ${linkColorClass}`}
                >
                  Read more
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Image Column */}
              <div className="flex-1">
                <Image
                  src={section.image}
                  alt={section.imageAlt}
                  width={600}
                  height={400}
                  className="h-auto w-full object-contain"
                />
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
