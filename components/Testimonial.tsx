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

  const t = testimonials[0];
  if (!t) return null;

  return (
    <section className="section-padding bg-muted/30">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="mb-12 text-3xl font-bold">{sectionTitle}</h2>

        <Quote className="mx-auto mb-6 h-8 w-8 text-primary/30" />

        <blockquote className="text-xl leading-relaxed text-foreground/90 md:text-2xl">
          &ldquo;{t.quote}&rdquo;
        </blockquote>

        <div className="mt-8">
          <div className="font-semibold">{t.name}</div>
          <div className="text-sm text-muted-foreground">
            {t.title}, {t.organization}
          </div>
          <div className="text-xs text-muted-foreground">{t.country}</div>
        </div>
      </div>
    </section>
  );
}
