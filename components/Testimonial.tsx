import { loadContent } from "@/lib/content";
import { Quote } from "lucide-react";

interface TestimonialItem {
  quote: string;
  name: string;
  title: string;
  organization: string;
  country: string;
}

export default function Testimonial({
  locale,
  sectionTitle,
}: {
  locale: string;
  sectionTitle: string;
}) {
  const { testimonials } = loadContent<{ testimonials: TestimonialItem[] }>(
    "testimonials",
    locale as "en" | "es" | "fr"
  );

  if (!testimonials.length) return null;

  return (
    <section className="section-padding bg-muted/30">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-12 text-center text-3xl font-bold">{sectionTitle}</h2>

        <div className={`grid gap-8 ${testimonials.length > 1 ? "md:grid-cols-2" : "mx-auto max-w-3xl"}`}>
          {testimonials.map((t) => (
            <div key={t.name} className="text-center">
              <Quote className="mx-auto mb-6 h-8 w-8 text-primary/30" />

              <blockquote className="text-lg leading-relaxed text-foreground/90 md:text-xl">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="mt-6">
                <div className="font-semibold">{t.name}</div>
                {(t.title || t.organization) && (
                  <div className="text-sm text-muted-foreground">
                    {[t.title, t.organization].filter(Boolean).join(", ")}
                  </div>
                )}
                {t.country && (
                  <div className="text-xs text-muted-foreground">{t.country}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
