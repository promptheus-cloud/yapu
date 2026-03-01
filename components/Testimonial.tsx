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

  // Feature the first testimonial prominently, like the real site
  const featured = testimonials[0];

  return (
    <section className="testimonial-section py-20 px-6">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mb-16 text-sm font-bold uppercase tracking-[0.2em] text-white/60">
          {sectionTitle}
        </h2>

        <div className="mx-auto max-w-3xl">
          <Quote className="mx-auto mb-8 h-10 w-10 text-white/30" />

          <blockquote className="text-xl leading-relaxed text-white/90 md:text-2xl">
            &ldquo;{featured.quote}&rdquo;
          </blockquote>

          <div className="mt-8">
            <div className="text-base font-semibold text-white">
              {featured.name}
            </div>
            {(featured.title || featured.organization) && (
              <div className="mt-1 text-sm text-white/60">
                {[featured.title, featured.organization]
                  .filter(Boolean)
                  .join(", ")}
              </div>
            )}
            {featured.country && (
              <div className="mt-0.5 text-sm text-white/40">
                {featured.country}
              </div>
            )}
          </div>
        </div>

        {/* Additional testimonials if present */}
        {testimonials.length > 1 && (
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {testimonials.slice(1).map((t) => (
              <div
                key={t.name}
                className="rounded-lg border border-white/10 bg-white/5 p-6 text-left"
              >
                <blockquote className="text-base leading-relaxed text-white/80">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="mt-4">
                  <div className="text-sm font-semibold text-white/90">
                    {t.name}
                  </div>
                  {(t.title || t.organization) && (
                    <div className="text-xs text-white/50">
                      {[t.title, t.organization].filter(Boolean).join(", ")}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
