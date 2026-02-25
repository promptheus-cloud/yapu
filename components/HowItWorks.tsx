import { loadContent } from "@/lib/content";
import { Plug, Smartphone, BarChart3 } from "lucide-react";

interface Step {
  number: number;
  title: string;
  description: string;
  icon: string;
}

const iconMap: Record<string, React.ReactNode> = {
  plug: <Plug className="h-6 w-6" />,
  smartphone: <Smartphone className="h-6 w-6" />,
  "bar-chart-3": <BarChart3 className="h-6 w-6" />,
};

export default function HowItWorks({
  locale,
  title,
  subtitle,
}: {
  locale: string;
  title: string;
  subtitle: string;
}) {
  const { steps } = loadContent<{ steps: Step[] }>("how-it-works", locale as "en" | "es" | "fr");

  return (
    <section className="section-padding">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-center text-3xl font-bold">{title}</h2>
        <p className="mb-12 text-center text-lg text-muted-foreground">{subtitle}</p>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                {iconMap[step.icon]}
              </div>
              <div className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Step {step.number}
              </div>
              <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
