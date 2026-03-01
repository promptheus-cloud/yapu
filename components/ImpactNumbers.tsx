import { loadContent } from "@/lib/content";

interface Metric {
  number: string;
  label: string;
  description: string;
}

export default function ImpactNumbers({
  locale,
  title,
}: {
  locale: string;
  title: string;
}) {
  const { metrics } = loadContent<{ metrics: Metric[] }>("impact", locale as "en" | "es" | "fr");

  return (
    <section id="impact" className="section-padding">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-12 text-center text-3xl font-bold">{title}</h2>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {metrics.map((m) => (
            <div key={m.label} className="glass-gold p-6 text-center">
              <div className="text-4xl font-bold text-primary md:text-5xl">
                {m.number}
              </div>
              <div className="mt-2 text-sm font-semibold">{m.label}</div>
              <div className="mt-1 text-xs text-muted-foreground">
                {m.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
